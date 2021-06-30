export const getItems = state => state.contacts.items
export const getFilter = state => state.contacts.filter
export const getLoading = state => state.contacts.loading

export const getFilteredItems = state =>
  getItems(state).filter(contact =>
    contact.name
      ? contact.name
          .toLowerCase()
          .includes(getFilter(state).toLocaleLowerCase())
      : []
  )
