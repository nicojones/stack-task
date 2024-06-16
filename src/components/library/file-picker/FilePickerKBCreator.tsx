"use client";

import { Dispatch, SetStateAction, useCallback, useLayoutEffect } from "react";

import { useAuthContext, useFilesContext } from "@/context";
import { createKnowledgeBaseResource } from "@/resources";
import { IKnowledgeBaseCreated } from "@/types";

import { pickedFilesToast } from "./helpers";

interface FilePickerKbCreatorProps {
  onCreateKb: (knowledgeBaseId: string) => any;
  children: JSX.Element;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const FilePickerKbCreator = ({
  onCreateKb,
  children,
  setLoading,
}: FilePickerKbCreatorProps): JSX.Element => {
  const { api, connectionId } = useAuthContext();
  const { selectedResources, toggleAll } = useFilesContext([]);

  const handleCreateKnowledgeBase = useCallback((): void => {
    setLoading(true);
    createKnowledgeBaseResource(api, connectionId, selectedResources)
      .then((created: IKnowledgeBaseCreated) => {
        toggleAll(false);
        onCreateKb(created.knowledge_base_id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [api, connectionId, selectedResources, toggleAll, onCreateKb, setLoading]);

  useLayoutEffect(() => {
    pickedFilesToast(
      selectedResources.length,
      handleCreateKnowledgeBase,
    );
  }, [selectedResources, handleCreateKnowledgeBase]);

  return children;
};
