export const initialState: IAppState = {
  isLoading: false,
  title: 'My Demo App'
};

export interface IAppState {
  isLoading: boolean
  title: string
}