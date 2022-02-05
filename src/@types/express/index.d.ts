/** overhide method request */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
