import { gql } from "@apollo/client";

// Create todos
export const ADD_TASK = gql`
  mutation AddTask($taskInput: TaskCreateInput!) {
    createTask(data: $taskInput) {
      id
    }
  }
`;
export const EDIT_TASK = gql`
  mutation EditTask($taskId: ID!, $taskInput: TaskUpdateInput!) {
    updateTask(where: { id: $taskId }, data: $taskInput) {
      id
    }
  }
`;
export const PUBLISH_TASK = gql`
  mutation PublishTask($taskId: ID!) {
    publishTask(where: { id: $taskId }, to: PUBLISHED) {
      id
    }
  }
`;
export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(where: { id: $taskId }) {
      id
    }
  }
`;