"use client";

import { noticeLists } from "./noticeLists";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { LoadingComp } from "@/app/_components/LoadingComp";

import { Accordion, AccordionItem } from "@nextui-org/react";

export const Content = () => {
  const { data: currentUser, isLoading: isLoading } = useGetCurrentUser();

  return !isLoading ? (
    <Accordion>
      {noticeLists.map((notice) => {
        return (
          <AccordionItem
            key={notice.id}
            title={notice.title}
            isDisabled={!notice.canAccess && !currentUser}
            subtitle={notice.canAccess ? "" : "회원만 볼 수 있어요"}
            disabled={!notice.canAccess && !currentUser}
            className="whitespace-pre-wrap"
          >
            {notice.content}
          </AccordionItem>
        );
      })}
    </Accordion>
  ) : (
    <LoadingComp />
  );
};
