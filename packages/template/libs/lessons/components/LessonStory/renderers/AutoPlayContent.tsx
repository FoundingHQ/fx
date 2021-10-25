/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, Component } from "react";
import { Renderer, Tester } from "../interfaces";

export const renderer: Renderer = (props) => {
  useEffect(() => {
    props.action("play");
  }, [props.story]);
  const Content = props.story.originalContent as unknown as typeof Component;
  return <Content {...props} />;
};

export const tester: Tester = (story) => {
  return {
    condition: !!story.content,
    priority: 2,
  };
};

export default {
  renderer,
  tester,
};
