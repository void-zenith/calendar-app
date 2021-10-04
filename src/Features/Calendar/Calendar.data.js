export const calendars = [
  {
    id: 1,
    name: "Office Calendar",
    description: "Calendar for office",
    events: [
      {
        calendar: 1,
        id: 1,
        title: "event1",
        start: "2021-10-01",
        end: "2021-10-02",
        description: "event1",
        color: "#9EEC61",
        Participation: [{ part: "part2" }],
      },
      {
        calendar: 1,
        id: 2,
        title: "event2",
        start: "2021-10-03",
        end: "2021-10-04",
        description: "event2",
        color: "#FF8E09",
        Participation: [{ part: "part2" }, { part: "part2" }],
      },
    ],
  },
  {
    id: 2,
    name: "Home Calendar",
    description: "Calendar for Home",
    events: [
      {
        calendar: 2,
        id: 3,
        title: "event3",
        start: "2021-10-03",
        end: "2021-10-05",
        description: "event3",
        color: "#E83A3A",
        Participation: [{ part: "part2" }],
      },
      {
        calendar: 2,
        id: 4,
        title: "event4",
        start: "2021-10-01",
        end: "2021-10-02",
        description: "event4",
        color: "#37DCDC",
        Participation: [{ part: "part2" }],
      },
    ],
  },
  {
    id: 3,
    name: "Holiday Calendar",
    description: "Calendar for Holiday",
    events: [
      {
        calendar: 3,
        id: 5,
        title: "event4",
        start: "2021-10-01",
        end: "2021-10-02",
        description: "event4",
        color: "#37DCDC",

        Participation: [{ part: "part2" }],
      },
      {
        id: 6,
        title: "event5",
        start: "2021-10-10",
        end: "2021-10-13",
        description: "event5",
        color: "#E83A3A",

        Participation: [{ part: "part2" }],
      },
    ],
  },
];
