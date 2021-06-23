import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
