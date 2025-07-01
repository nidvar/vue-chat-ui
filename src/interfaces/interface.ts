export interface Blog{
  _id:number
  title: string
  body: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
};

export interface Reply{
  _id: number
  comment: string
  replyTo: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export interface Data {
  _id: number
  title: string
  body: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
};
