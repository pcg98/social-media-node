enum Sex {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export class User {

  constructor(
      public name: string,
      public last_name: string,
      public email: string,
      public nickname: string,
      public telehpone: string,
      public password: string,
      public sex: Sex,
      public user_statusid: number,
      public user_rolid: number = 1,
      public id?: Number,
  ) {}


}
