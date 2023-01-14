export type Nullable<T> = T | null;

export interface CanvasObject {
  id: string;
  username: string;
  figure?: {
    type: 'brush';
    x: number;
    y: number;
  };
  method?: 'connection' | 'draw';
}
