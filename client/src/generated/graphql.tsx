import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddExerciseInput = {
  exerciseId: Scalars['String'];
  playlistId: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  _id: Scalars['String'];
  difficulty: Scalars['String'];
  gif1: Scalars['String'];
  gif2: Scalars['String'];
  name: Scalars['String'];
  steps: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type ExerciseInput = {
  difficulty: Scalars['String'];
  gif1: Scalars['String'];
  gif2: Scalars['String'];
  name: Scalars['String'];
  steps: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExercise: Playlist;
  createExercise: Exercise;
  createPlaylist: Playlist;
  login: User;
  logout: Scalars['Boolean'];
  register: User;
  removeExercise: Playlist;
};


export type MutationAddExerciseArgs = {
  input: AddExerciseInput;
};


export type MutationCreateExerciseArgs = {
  input: ExerciseInput;
};


export type MutationCreatePlaylistArgs = {
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveExerciseArgs = {
  input: AddExerciseInput;
};

export type Playlist = {
  __typename?: 'Playlist';
  _id: Scalars['String'];
  exercises: Array<Exercise>;
  name: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  exercise: Exercise;
  exercises: Array<Exercise>;
  me?: Maybe<User>;
  myPlaylists: Array<Playlist>;
  playlist: Playlist;
};


export type QueryExerciseArgs = {
  name: Scalars['String'];
};


export type QueryPlaylistArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserResponseFragment = { __typename?: 'User', _id: string, name: string, email: string };

export type AddExerciseMutationVariables = Exact<{
  input: AddExerciseInput;
}>;


export type AddExerciseMutation = { __typename?: 'Mutation', addExercise: { __typename?: 'Playlist', _id: string, name: string, user: { __typename?: 'User', _id: string }, exercises: Array<{ __typename?: 'Exercise', _id: string, name: string }> } };

export type CreatePlaylistMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreatePlaylistMutation = { __typename?: 'Mutation', createPlaylist: { __typename?: 'Playlist', _id: string, name: string, user: { __typename?: 'User', name: string }, exercises: Array<{ __typename?: 'Exercise', name: string }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', _id: string, name: string, email: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', _id: string, name: string, email: string } };

export type RemoveExerciseMutationVariables = Exact<{
  input: AddExerciseInput;
}>;


export type RemoveExerciseMutation = { __typename?: 'Mutation', removeExercise: { __typename?: 'Playlist', _id: string, name: string, user: { __typename?: 'User', _id: string }, exercises: Array<{ __typename?: 'Exercise', _id: string, name: string }> } };

export type ExerciseQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ExerciseQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', _id: string, name: string, difficulty: string, tags: Array<string>, steps: Array<string>, gif1: string, gif2: string } };

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { __typename?: 'Query', exercises: Array<{ __typename?: 'Exercise', _id: string, name: string, difficulty: string, tags: Array<string> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, name: string, email: string } | null | undefined };

export type MyPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPlaylistsQuery = { __typename?: 'Query', myPlaylists: Array<{ __typename?: 'Playlist', _id: string, name: string }> };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', _id: string, name: string, exercises: Array<{ __typename?: 'Exercise', _id: string, name: string, tags: Array<string> }>, user: { __typename?: 'User', _id: string } } };

export const UserResponseFragmentDoc = gql`
    fragment UserResponse on User {
  _id
  name
  email
}
    `;
export const AddExerciseDocument = gql`
    mutation addExercise($input: AddExerciseInput!) {
  addExercise(input: $input) {
    _id
    name
    user {
      _id
    }
    exercises {
      _id
      name
    }
  }
}
    `;

export function useAddExerciseMutation() {
  return Urql.useMutation<AddExerciseMutation, AddExerciseMutationVariables>(AddExerciseDocument);
};
export const CreatePlaylistDocument = gql`
    mutation createPlaylist($name: String!) {
  createPlaylist(name: $name) {
    _id
    name
    user {
      name
    }
    exercises {
      name
    }
  }
}
    `;

export function useCreatePlaylistMutation() {
  return Urql.useMutation<CreatePlaylistMutation, CreatePlaylistMutationVariables>(CreatePlaylistDocument);
};
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RemoveExerciseDocument = gql`
    mutation removeExercise($input: AddExerciseInput!) {
  removeExercise(input: $input) {
    _id
    name
    user {
      _id
    }
    exercises {
      _id
      name
    }
  }
}
    `;

export function useRemoveExerciseMutation() {
  return Urql.useMutation<RemoveExerciseMutation, RemoveExerciseMutationVariables>(RemoveExerciseDocument);
};
export const ExerciseDocument = gql`
    query Exercise($name: String!) {
  exercise(name: $name) {
    _id
    name
    difficulty
    tags
    steps
    gif1
    gif2
  }
}
    `;

export function useExerciseQuery(options: Omit<Urql.UseQueryArgs<ExerciseQueryVariables>, 'query'>) {
  return Urql.useQuery<ExerciseQuery>({ query: ExerciseDocument, ...options });
};
export const ExercisesDocument = gql`
    query Exercises {
  exercises {
    _id
    name
    difficulty
    tags
  }
}
    `;

export function useExercisesQuery(options?: Omit<Urql.UseQueryArgs<ExercisesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExercisesQuery>({ query: ExercisesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyPlaylistsDocument = gql`
    query MyPlaylists {
  myPlaylists {
    _id
    name
  }
}
    `;

export function useMyPlaylistsQuery(options?: Omit<Urql.UseQueryArgs<MyPlaylistsQueryVariables>, 'query'>) {
  return Urql.useQuery<MyPlaylistsQuery>({ query: MyPlaylistsDocument, ...options });
};
export const PlaylistDocument = gql`
    query Playlist($id: String!) {
  playlist(id: $id) {
    _id
    name
    exercises {
      _id
      name
      tags
    }
    user {
      _id
    }
  }
}
    `;

export function usePlaylistQuery(options: Omit<Urql.UseQueryArgs<PlaylistQueryVariables>, 'query'>) {
  return Urql.useQuery<PlaylistQuery>({ query: PlaylistDocument, ...options });
};