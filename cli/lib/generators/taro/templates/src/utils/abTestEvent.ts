import Rangers from '@datarangers/sdk-mp'

export const abTestEventCreateSuccess = () => {
  Rangers.event('profile_create_success')
}

export const abTestEventNoProfileCount = () => {
  Rangers.event('no_profile_count')
}

export const setAbTestUniqueId = (user_unique_id) => {
  Rangers.config({
    user_unique_id
  })
}