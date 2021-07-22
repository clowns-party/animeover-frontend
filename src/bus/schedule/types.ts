import { Anime } from "../anime/types";

export interface AnimeItemExtended extends Anime {
  date: string;
}

export type ScheduleAnimeItem = AnimeItemExtended[];

export type ScheduleDateItems = {
  Friday: ScheduleAnimeItem;
  Monday: ScheduleAnimeItem;
  Saturday: ScheduleAnimeItem;
  Sunday: ScheduleAnimeItem;
  Thursday: ScheduleAnimeItem;
  Tuesday: ScheduleAnimeItem;
  Wednesday: ScheduleAnimeItem;
};

export type SheduleRespose = { data: ScheduleDateItems };
