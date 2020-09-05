export interface DatabaseDriver {
  errors: any[];
  Connect: (connectionParams: string | ConnParams) => void;
  DefineModel: (model: Model) => ModelWrapper;
  
}

export interface Model {
  Name: string;
  TableName?: string;
  Fields: Array<DaoField>;
  Relationships: Array<ModelRelationship>;
  Indexes: Array<any>;
}

export interface ModelWrapper {
  schema: any;
  Find: () => Result[];
  FindOne: () => Result;
  Query: () => Result;
  Insert: () => Result;
  Search: () => Result;
}

export interface Result {}

export interface ModelRelationship {
  field: string;
  type: "one-to-one" | "one-to-many" | "many-to-one";
  index: boolean;
  unique?: boolean;
  foreignKey?: boolean;
}

export interface DaoField {
  name: string;
  index: boolean;
  primaryKey?: boolean;
}
export interface MongoDriverConfig {
  url: string;
  options: MongoConnectionOptions;
}

export interface MongoConnectionOptions {}
export interface ConnParams {}
