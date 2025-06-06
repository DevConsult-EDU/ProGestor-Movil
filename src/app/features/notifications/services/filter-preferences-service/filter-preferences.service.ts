import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const FILTERS_KEY = 'notification_filters';

@Injectable({
  providedIn: 'root'
})
export class FilterPreferenceService {

  constructor() { }

  async saveFilters(filters: string[]): Promise<void> {
    await Preferences.set({
      key: FILTERS_KEY,
      value: JSON.stringify(filters)
    });
  }

  async loadFilters(): Promise<string[]> {
    const result = await Preferences.get({ key: FILTERS_KEY });
    if (result.value) {
      return JSON.parse(result.value) as string[];
    }
    return [];
  }
}
