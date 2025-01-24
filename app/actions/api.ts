'use client'
export interface Category {
  id: number;
  name: string;
  icon: number;
}

export interface List {
  id: number;
  category: Category;
  comment: string | null;
  date: Date;
  amount: number;
}

export interface ListAdd {
  category: string;
  comment: string | null;
  date: Date;
  amount: number;
}

export interface Saving {
  name: string;
  amount: number;
  target: number;
  list: Saving[];
}

export interface SavingAdd {
  name: string;
  type: string;
  amount: number;
}

export interface APIData {
  debitList: List[];
  creditList: List[];
  debitCategories: Category[];
  creditCategories: Category[];
  savings: Saving[];
}

export interface FileData {
  id: number;
  file: string;
}

export interface FileAPIData {
  files: FileData[];
}

export interface Health {
  earlyMorningDrink: string;
  breakfast: string;
  forenoonDrink: string;
  forenoonDrinkOthers: string | null;
  lunch: string;
  snacsks: string;
  dinner: string;
  dinnerOthers: string | null;
  others: string | null,
  percentage: number;
}


export interface HealthList {
  [key: number]: Health;
}

export interface HealthAPIData {
  healthList: HealthList;
}


export class API {
  static saveData = async (data: APIData) => {
    const response = await fetch(
      'https://api.github.com/gists/23b06265424e8ccc76fc875483aa71ea',
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer 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',
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          files: {
            finance: { content: JSON.stringify(data) },
          },
        }),
      },
    );
    const res = await response.json();
    if (!response.ok) {
      throw Error('Request not saved');
    }
    return res;
  };

  static getData = async () => {
    const response = await fetch(
      'https://api.github.com/gists/23b06265424e8ccc76fc875483aa71ea',
      {
        headers: {
          Authorization: 'Bearer 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',
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    if (!response.ok) {
      throw Error('Unable to fetch data');
    }
    const jsonData = await response.json();
    const data = JSON.parse(jsonData.files.finance.content) as APIData;
    const fileData = JSON.parse(jsonData.files.media.content) as FileAPIData;
    const healthData = JSON.parse(jsonData.files.health.content) as HealthAPIData;
    return { data, fileData, healthData };
  };

  static saveFile = async (data: FileAPIData) => {
    const response = await fetch(
      'https://api.github.com/gists/23b06265424e8ccc76fc875483aa71ea',
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer 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',
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          files: {
            media: { content: JSON.stringify(data) },
          },
        }),
      },
    );
    const res = await response.json();
    if (!response.ok) {
      throw Error('Request not saved');
    }
    return res;
  };

  static saveHealthList = async (data: HealthAPIData) => {
    const response = await fetch(
      'https://api.github.com/gists/23b06265424e8ccc76fc875483aa71ea',
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer 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',
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          files: {
            health: { content: JSON.stringify(data) },
          },
        }),
      },
    );
    const res = await response.json();
    if (!response.ok) {
      throw Error('Request not saved');
    }
    return res;
  };
}