import { useEffect, useState } from 'react'
import Rangers from '@datarangers/sdk-mp'

const useAbTest = () => {
  const [isProfileCreateTest, setProfileCreateTest] = useState<boolean>(false);

  useEffect(() => {
    Rangers.getVar('profile_type_0820v2', '1', function(value) {
      if (value == 1) {
        setProfileCreateTest(false)
      } else {
        setProfileCreateTest(true)
      }
    })
  }, []);

  return {
    isProfileCreateTest
  }
}

export default useAbTest;

