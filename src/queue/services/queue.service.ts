import { Queue } from "bullmq";
import { redisConnection } from "../redis/connection";
import { QUEUES, JOBS } from "../constants/queue.constants";

class QueueService {
  private queues: Map<string, Queue> = new Map();

  getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const queue = new Queue(name, {
        connection: redisConnection,
      });

      this.queues.set(name, queue);
    }

    return this.queues.get(name)!;
  }

  async addJob(
    queueName: string,
    jobName: string,
    data: any,
  ) {
    const queue = this.getQueue(queueName);

    const job = await queue.add(jobName, data);

    return job;
  }

  async addLegalDocumentJob(data: {
    documentId: string;
    fileBase64: string;
    title: string;
  }) {
    return this.addJob(
      QUEUES.LEGAL_DOCUMENT,
      JOBS.PROCESS_LEGAL_PDF,
      data,
    );
  }
}

export const queueService = new QueueService();