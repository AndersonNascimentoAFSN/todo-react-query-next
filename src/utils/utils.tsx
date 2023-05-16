import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { rest } from "msw";
import * as React from "react";

export const handlers = [
  rest.get("http://localhost:3333/todo", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        todo: [
          {
            id: '1',
            description: 'Task 1',
            isCompleted: false
          },
          {
            id: '2',
            description: 'Task 2',
            isCompleted: false
          },
          {
            id: '3',
            description: 'Task 3',
            isCompleted: false
          }
        ]
      })
    );
  }),
  // rest.post("*/todo", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       name: "Chuck Norris",
  //     })
  //   );
  // }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactNode) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactNode) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

createWrapper.displayName = "createWrapper";