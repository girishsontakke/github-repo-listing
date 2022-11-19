export interface IRepository {
  id: string;
  name: string;
  private: boolean;
  description: string;
  forks_count: number;
  stargazers_count: number;
  language: string;
}
