import prisma from "../../config/prisma";

export class ConversationService {
  async createConversation(
    userId: string,
    title?: string,
    category?: string,
  ) {
    const conversation = await prisma.conversation.create({
      data: {
        userId,
        title,
        category,
      },
    });

    return conversation;
  }

  async getUserConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return conversations;
}

 async getConversationById(userId: string, conversationId: string) {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },
  });

  return conversation;
}

async sendMessage(
  userId: string,
  conversationId: string,
  content: string,
) {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const userMessage = await prisma.message.create({
    data: {
      conversationId,
      role: "USER",
      content,
    },
  });

  return userMessage;
}
}