import { FastifyRequest, FastifyReply } from "fastify";

// Mock data for demonstration purposes
const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description of Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description of Task 2",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description of Task 3",
    completed: true,
  },
];

export async function getAllTasks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Fetch tasks from the database or any other data source
  // Replace this with your actual database query or service call
  return tasks;
}
