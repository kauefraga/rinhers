export type Rinher = {
  'name': string;
  'social'?: string[];
  'source-code-repo': string;
  'langs'?: string[];
  'storages'?: string[];
  'load-balancers'?: string[];
  'messaging'?: string[];
  'other-technologies'?: string[];
  'partial-results'?: Record<string, string | undefined>;
  '_metadata': {
    source_url: string;
    downloaded_at: string;
  };
};
