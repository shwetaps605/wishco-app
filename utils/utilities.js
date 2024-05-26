export const getBadgeColor = (jobStatus) => {
    console.log(jobStatus)
    if(jobStatus === 'applied')
      return 'badge-info'
    if(jobStatus === 'interview')
      return 'badge-warning'
    if(jobStatus === 'rejected')
      return 'badge-error'
    return 'badge-success'
  }