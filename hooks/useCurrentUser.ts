import { FetchUserAttributesOutput, fetchUserAttributes } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useState, useEffect } from "react";

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<FetchUserAttributesOutput|undefined>();

    async function currentAuthenticatedUser() {
        try {
          const  result   = await fetchUserAttributes();
          setCurrentUser(result);
        } catch (err) {
          console.log(err);
        }
      }
    useEffect(() => {
        currentAuthenticatedUser();
        const cancelToken=Hub.listen('auth', (data) => {
            const { payload } = data;
            if (payload.event === 'signedIn') {
                currentAuthenticatedUser();
            }
            if (payload.event === 'signedOut') {
                setCurrentUser(undefined);
            }
        });
        return () => {
            cancelToken();
        }
    }, []
);
    return currentUser;
}

export default useCurrentUser;