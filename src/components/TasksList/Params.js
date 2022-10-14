export const moreUrgentFirst = () => {
  let params = { orderBy: "urgency", order: "DESC" }
  return getUrlParams(params);
}

export const lessUrgentFirst = () => {
  let params = { orderBy: "urgency" }
  return getUrlParams(params);
}

export const doneFirst = () => {
  let params = { orderBy: "done", order: "DESC" }
  return getUrlParams(params);
}

export const toDoFirst = () => {
  let params = { orderBy: "done" }
  return getUrlParams(params);
}

const getUrlParams = (params) => {
  if (window.localStorage.getItem('hideDone') === "true") {
    params['hideDone'] = "true"
  }

  return new URLSearchParams(params).toString()
}
