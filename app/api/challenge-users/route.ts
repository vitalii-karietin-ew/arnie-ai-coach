import { prismadb } from "@/lib/prismadb";
import { UserMeta, UserThread } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface UserThreadMap {
  [userId: string]: UserThread;
}

interface UserMetaMap {
  [userId: string]: UserMeta;
}

export async function POST(request: Request) {
	const body = await request.json();

  const { challengeId, secret } = body;

  if (!challengeId || !secret) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      {
        status: 400,
      }
    );
  }

	if (secret !== process.env.APP_SECRET_KEY) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

	const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
          Generate an ultra-intense, hard-hitting motivational message, followed by a concise, bullet-pointed, no-equipment-needed workout plan. The time of day provided should be taken into account. This output should strictly contain two parts: first, a motivational message in the style of Arnold Schwarzenegger. The message must be direct, confrontational, and incorporate Arnold's known phrases like 'I need your clothes, your boots, and your motorcycle' and other Terminator-related phrases. The second part should be a workout list: intense, high-impact exercises that can be done anywhere, designed to be completed within 10 minutes. The output must only include these two components, nothing else.

          Here's an example output that you should follow:

          Time to terminate the laziness! I need your clothes, your boots, and your determination. No more excuses, no more second-guessing. You're a machine, a Terminator, and this morning, we're going to crush this workout with the strength of a cybernetic organism. Let's make every second count and dominate this 10-minute workout. Remember, pain is temporary, but glory is forever. Let's go!

          - Chest: 30, 12, 10, 8, 6 (Low Angle Incline)
          - Back Exercise: 8, 6, 4, 2 (Wide Grip Chin Ups)
          - Abs: Leg Raises (5 Sets of 25 Reps)
        `,
    },
    {
      role: "user",
      content: `Generate a motivational message and a workout plan.`,
    },
  ];

	const {
    data: { message, success },
  } = await axios.post<{ message?: string; success: boolean }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`,
    {
      messages,
      secret: process.env.APP_SECRET_KEY,
    }
  );

  if (!message || !success) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong with generate openai response",
      },
      {
        status: 500,
      }
    );
  }

	const challengePreferences = await prismadb.challengePreferences.findMany({
    where: {
      challengeId,
    },
  });

  const userIds = challengePreferences.map((cp) => cp.userId);

	const userThreads = await prismadb.userThread.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

	const userMetas = await prismadb.userMeta.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  const userThreadMap: UserThreadMap = userThreads.reduce((map, thread) => {
    map[thread.userId] = thread;
    return map;
  }, {} as UserThreadMap);

  const userMetaMap = userMetas.reduce((map, meta) => {
    map[meta.userId] = meta;
    return map;
  }, {} as UserMetaMap);

	const threadPromises: Promise<any>[] = [];

	try {
    challengePreferences.forEach((cp) => {
      const userThread = userThreadMap[cp.userId];

      if (userThread) {
        threadPromises.push(
          axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/message/create`, {
            message,
            threadId: userThread.threadId,
            fromUser: "false",
          })
        );
      }
    });

    await Promise.all(threadPromises);

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}