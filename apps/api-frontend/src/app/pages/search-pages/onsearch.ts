import { ScholarsDB } from '@foodmedicine/interfaces';

export function onSearch(query: string, db: ScholarsDB, history: any) {
  history.push(`/results?query=${encodeURIComponent(query)}&db=${encodeURIComponent(db)}`);
}
