export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface IGitRepository {
  id: string;
  name: string;
  private: boolean;
  full_name: string;
  description: string;
  url: string;
  default_branch: string;
}

export interface IGitBranch {
  name: string;
  protected: false;
  commit: {
    sha: string;
    url: string;
  };
}
