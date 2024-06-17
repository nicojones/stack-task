"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect } from "react";

import { useAuthContext, useFilesContext } from "@/context";
import { createKnowledgeBaseResource } from "@/resources";
import { IKnowledgeBaseCreated } from "@/types";

import { pickedFilesToast } from "./helpers";

interface FilePickerKbCreatorProps {
  onCreateKb: (knowledgeBaseId: string) => any;
  children: JSX.Element;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export const FilePickerKbCreator = ({
  onCreateKb,
  children,
  setLoading,
  loading,
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
      !loading,
    );
  }, [selectedResources, handleCreateKnowledgeBase, loading]);

  useEffect(() => {
    return () => pickedFilesToast(0, () => null, false);
  }, []);

  return children;
};
