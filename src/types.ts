export interface IRepository {
  id: string;
  name: string;
  private: boolean;
  description: string;
  forks_count: number;
  stargazers_count: number;
  language: string;
}

export interface Iprofile {
  name: string;
  login: string;
  location?: string;
  company?: string;
  blog?: string;
  twitter_username?: string;
  followers: number;
  following: number;
  avatar_url: string;
  public_repos: number;
}
