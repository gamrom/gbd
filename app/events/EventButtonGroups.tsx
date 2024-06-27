// import Link from "next/link";
import { EventProps } from "@/types";
import dayjs from "dayjs";
import { Card, CardBody, CardFooter, Divider, Chip } from "@nextui-org/react";

export const EventButtonGroups = ({
  events,
}: {
  events: Array<EventProps>;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {events &&
        events.map((event: EventProps, index: number) => {
          return (
            <Card
              isPressable={true}
              onPress={() => {
                window.location.href = `/events/${event.id}`;
              }}
              key={index}
              fullWidth={true}
              isHoverable={true}
            >
              <CardBody className="flex flex-row items-center justify-between gap-2">
                <div>{event.title}</div>

                {
                  <Chip
                    className="text-white"
                    color={
                      event.current_members_count >= event.max_members_count
                        ? "danger"
                        : "success"
                    }
                  >
                    {event.current_members_count >= event.max_members_count
                      ? "마감"
                      : "참가 가능"}
                  </Chip>
                }
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-between gap-4 text-small text-default-500">
                <div>
                  {dayjs(event.start_time.replace(/-/g, "/")).format(
                    "YY/MM/DD"
                  )}
                </div>
                <div>{event.location}</div>
                <div className="mr-auto">{event.owner_name}</div>
                <div>
                  {event.current_members_count}/{event.max_members_count}
                </div>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
};
