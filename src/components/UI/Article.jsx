'use client'
import { useState, useEffect } from 'react'
import StyledTag from '../../components/UI/StyledTag'
import ButtonSecondary from '../../components/UI/ButtonSecondary2'
import Image from 'next/image'
import {motion} from 'framer-motion'

export const metadata = {
	title: "Assignment 11: Integration",
	description: "In this short article, I show off my UI design and demonstrate how I used my partner’s microservice to test how my blog will handle images of varying sizes.",
}
export default function Article( {metadata} ) {
	const [coverImage, setCoverImage] = useState('/test-images/img1.png')
	const [articleImage, setArticleImage] = useState('/test-images/img1.png')
	const [coverLoading, setCoverLoading] = useState(false)
	const [articleImageLoading, setArticleImageLoading] = useState(false)

	const getRandomImage = async () => {
		const randomImage = await fetch('https://image-micro-193c66c66e13.herokuapp.com/random-image')
		if (!randomImage.ok) {
			const res = await randomImage.json()
			console.error(res.error)
			return
		}

		const res = await randomImage.json()
		console.log(res.message)
		return res.imageUrl
	}

	const handleLoadArticleImage = (e) => {
		setArticleImageLoading(false)
		// e.target.style.height = 'auto'
		// e.target.parentElement.style.height = `${e.target.offsetHeight}px`
	}

	const setRandomCover = async () => {
		setCoverLoading(true)
		const randomImage = await getRandomImage()
		// const randomImage = await simulatedRequest(3000)
		setCoverImage(randomImage)
	}

	const setRandomArticleImage = async (e) => {
		setArticleImageLoading(true)
		const randomImage = await getRandomImage()
		// const randomImage = await simulatedRequest(3000)
		// setArticleImageLoading(false)
		setArticleImage(randomImage)
	}

	const tags = ['CS 361', 'Microservices', 'Web Design']
	const headerStyle = "mb-4 mt-16 text-3xl font-semibold text-gray-900"
	const pStyle = "mb-4 text-lg text-gray-700"

  return (
    <main className="pt-4 pb-20 flex w-full flex flex-col items-center lg:pb-24">
			<section className="w-full max-w-7xl flex flex-col items-center border-b pb-16">
				<header className="flex py-8 mb-8 w-full flex-col items-center">
					<p className="mb-8 font-bold max-w-prose text-blue-600"> Published 2 Dec 2023 </p>
					<h1 className="mb-8 text-4xl max-w-prose font-bold text-center text-gray-900" style={{ textWrap: 'balance' }}> {metadata.title} </h1>
					<p className="mb-8 text-lg max-w-prose text-gray-700 text-center" style={{ textWrap: 'balance' }}> {metadata.description} </p>
					<span className="mb-8 flex max-w-prose w-full gap-4 flex-wrap justify-center">
						{ tags.map((tag, index) => (
								<StyledTag key={index} colorIndex={index}>{tag}</StyledTag>
							))
						}
					</span>
					{/* <Image src="/test-images/img1.png" alt="test image" width={1280} height={640}/> */}
					{ coverImage &&
					<>
						<div className={`mb-4 relative w-full h-[320px] md:h-[480px] lg:h-[640px] ${coverLoading ? 'hidden' : ''}`}>
							<Image src={coverImage}
								alt="test image" 
								fill
								sizes="100vw"
								style={{ objectFit: 'cover' }}
								priority
								onLoad={() => setCoverLoading(false)}
							/>
						</div>
						{ coverLoading &&
							// Loading animation
							<motion.div className="mb-4 relative w-full h-[320px] md:h-[480px] lg:h-[640px] bg-gray-300 flex justify-center items-center"
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							></motion.div>
						}
					</>
					}
					<ButtonSecondary 
						onClick={setRandomCover}
					> Random Image </ButtonSecondary>
				</header>
				<article className="w-full max-w-prose flex flex-col">
					<h2 className={headerStyle}>
						How I used my partner&apos;s microservice
					</h2>
					<p className={pStyle}>
						In CS290, I created a blog that supports content management through markdown (www.bgevko.com/blog). The was to edit content on my local computer in markdown format, push it to the web, and then have the website render it with all the proper HTML tags, which is a very common approach to how developers create documentation. My system works for the most part, but one aspect I failed to account for is the coverLoading of images. <br></br><br></br>
						The use of images in conventional web development can be a very involved process. You have to find the right image, trim it, compress it, and then either host it or include it in your project directory so that your web page can load it.
						For this project, I decided to try an alternative approach to using images on the web. Services like unsplash provide an easy way to browse and include images in your web project. However, images from unsplash come in varying dimensions. My goal for this project was to design an article template that can handle images of varying sizes without negatively affecting the rest of the layout. <br></br><br></br>
						After many design iterations, I have the finished result. Click the Random Image button below any image on this page to see how the page will look with designs of various sizes. 
					</p>
					<div className={`my-4 relative w-full ${articleImageLoading ? 'hidden' : ''}`}>
						<Image 
							className="rounded-lg"
							src={articleImage}
							alt="test image" 
							width={650}
							height={366}
							sizes="100vw"
							onLoad={(event) => handleLoadArticleImage(event)}
						/>
					</div>
					{ articleImageLoading &&
						// Loading animation
						<motion.div className="mb-4 rounded-lg relative w-full h-[320px] bg-gray-300 flex justify-center items-center"
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						></motion.div>
					}
					<ButtonSecondary
						className="mx-auto w-[160px]"
						onClick={(e) => setRandomArticleImage(e)}
					> Random Image </ButtonSecondary>

					<h2 className={headerStyle}>Was a random image API necessary?</h2>
					<p className={pStyle}>
						Maybe experience can guide the hands of more seasoned developers, but its more often than not that I catch my design mistakes long after I deployed a website. Although not strictly necessary, using my partner&apos;s microservice helped me catch UI issues early and resulted in a robust user interface. There are likely better ways of testing such things, and I look forward to discovering them as I grow as developer.
					</p>
				</article>
			</section>
		</main>
	)
}

// For testing purposes only
function simulatedRequest(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const imageUrl = 'https://images.unsplash.com/photo-1698966378323-51d7982dfd96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Mjk2OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE1MjA2NDR8&ixlib=rb-4.0.3&q=85'; 
      resolve(imageUrl);
    }, timeout); 
  });
}
