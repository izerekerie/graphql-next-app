"use client"; // Make this a client component

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient"; // Assuming you have your Apollo Client setup

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
