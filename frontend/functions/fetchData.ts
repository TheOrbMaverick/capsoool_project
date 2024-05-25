import { Alert } from 'react-native';

export const fetchData = async (url: string, setData?: (data: any) => void, setIsLoading?: (isLoading: boolean) => void) => {
    if (setIsLoading) setIsLoading(true);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (setData) setData(result);
    } catch (error: any) {
        Alert.alert('Error', error.message);
    } finally {
        if (setIsLoading) setIsLoading(false);
    }
};
