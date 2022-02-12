import { getPlant, getPlantList } from "@api/";
import { Layout } from "@components/Layout";
import { Link, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { RichText } from "@components/RichText";
import { AuthorCard } from "@components/AuthorCard";
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useState } from "react";
import { PlantEntryInline } from "@components/PlantCollection"
import { getCategoryList } from "@api/";


/** type PlantEntryPageProps = {
    plant: Plant | null
    otherEntries: Plant[] | null
    categories: Category[] | null
}*/

type PathType = {
    params: {
        slug: string
    }
}
export const getStaticPaths = async () => {

    const entries = await getPlantList({ limit: 10 })

    const paths: PathType[] = entries.map((plant) => ({
        params: {
            slug: plant.slug
        }
    }))

    return {
        paths,
        // 404 en las entradas no encontradas
        fallback: false
    }
}

type PlantEntryPageProps = {
    plant: Plant | null
    otherEntries: Plant[] | null
    categories: Category[] | null
}

export const getStaticProps: GetStaticProps<PlantEntryPageProps> = async ({ params }) => {
    const slug = params?.slug

    if (typeof slug !== "string") {
        return {
            notFound: true
        }
    }

    try {
        const plant = await getPlant(slug)

        const otherEntries = await getPlantList({
            limit: 5
        })

        const categories = await getCategoryList({ limit: 10 })

        return {
            props: {
                plant,
                otherEntries,
                categories
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }

}

export default function PlantEntryPage({ plant, otherEntries, categories }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        <img width={952} src={plant.image.url} alt={plant.image.title} />
                    </figure>
                    <div className="px-12 pt-8">
                        <Typography variant="h2">{plant.plantName}</Typography>
                    </div>
                    <div className="p-10">
                        <RichText richText={plant.description} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} component="aside">
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Recent posts
                        </Typography>
                        {
                            otherEntries?.map((plantEntry) => (
                                <article className="mb-4" key={plantEntry.id}>
                                    <PlantEntryInline {...plantEntry} />
                                </article>
                            ))
                        }
                    </section>
                </Grid>
            </Grid>
            <section className="mt-10">
                <Typography variant="h5" component="h3" className="mb-4">
                    Categories
                </Typography>
                <ul className="list">
                    {
                        categories?.map((category) => (
                            <li key={category.id}>
                                <Link passHref href={`/category/${category.slug}`}>
                                    <Typography component="a" variant="h6">
                                        {category.title}
                                    </Typography>
                                </Link>
                            </li>
                        ))
                    }

                </ul>
            </section>

        </Layout>
    )
}