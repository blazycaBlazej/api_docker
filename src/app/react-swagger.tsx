"use client";
// @ts-ignore
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

export const ReactSwagger = ({ spec }: Props) => {
  console.log(spec);
  return <SwaggerUI spec={spec} />;
};
