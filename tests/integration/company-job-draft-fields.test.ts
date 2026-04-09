import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  JobDraftHintText,
  JobDraftLanguageChip,
  JobDraftSectionHeading,
  JobDraftSelectField,
} from "../../src/components/portal/company-job-draft-fields";

describe("company job draft shared fields", () => {
  it("renders the shared copy primitives used across both wizard steps", () => {
    render(
      React.createElement(
        "div",
        null,
        React.createElement(JobDraftLanguageChip, { compact: true }),
        React.createElement(JobDraftSectionHeading, {
          children: "descrizione offerta",
          compact: true,
        }),
        React.createElement(JobDraftHintText, {
          children: "guida contestuale SDG",
          compact: true,
        }),
      ),
    );

    expect(
      screen.getByRole("button", { name: "Lingua italiana" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "descrizione offerta" }),
    ).toBeInTheDocument();
    expect(screen.getByText("guida contestuale SDG")).toBeInTheDocument();
  });

  it("renders the shared select field and forwards selection changes", () => {
    const handleChange = vi.fn();

    render(
      React.createElement(JobDraftSelectField, {
        dataNodeId: "259:1081",
        id: "contract-type",
        label: "tipologia di contratto",
        onChange: handleChange,
        options: [{ id: "stage", label: "stage" }],
        value: "",
      }),
    );

    const select = screen.getByLabelText("tipologia di contratto");

    expect(select).toHaveValue("");
    expect(screen.getByRole("option", { name: "stage" })).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "stage" } });

    expect(handleChange).toHaveBeenCalledWith("stage");
  });
});
