import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  {
    # tasks(orderBy: createdAt_DESC) {
    # tasks(orderBy: createdAt_ASC) {
    tasks {
      id
      title
      taskStatus
      publishedAt
    }
  }
`;

// const GET_BOARDS = gql`
//   query GetBoards {
//     boards {
//       id
//       name
//       position
//       tasks {
//         id
//         title
//         description
//       }
//     }
//   }
// `;

