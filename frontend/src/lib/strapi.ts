import qs from 'qs'

export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL ;


const QUERY_HOME_PAGE =
{
    populate: {
        sections: {
            on: {
                "layout.hero-section": {
                    populate: {
                        images: {
                            populate: {
                                image: {
                                    fields: ["url"]
                                }
                            }
                        },
                        link: {
                            populate: true
                        }
                    }
                }
            }
        }
    }
}

export async function getHomePage() {
    // 'use cache'
    const query = qs.stringify(QUERY_HOME_PAGE)
    const response = await getStrapiData(`/api/home-page?${query}`)

    return response?.data;
}
export async function getStrapiData(url: string) {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Error fetching data:', error)
        return null;
    }
}

getStrapiData('/api/home-page');