import { useRef, useState, Suspense, useEffect } from "react";
import ReactPlayer from 'react-player'
import { ErrorBoundary } from "react-error-boundary";
// import Iframe from 'react-iframe'
import Link from "next/link";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";

// Local Data
import data from "../yourData";

const Fallback = ({ err }) => {
    console.error("Error:", err);
    return (
        <>
            <div>
                Something went wrong
            </div>
        </>
    );
};

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();

  const [mounted, setMounted] = useState(false);

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

  return (


      <ErrorBoundary
          fallbackRender={({ err, componentStack, resetErrorBoundary }) => (
              <Fallback
                  err={err}
                  componentStack={componentStack}
                  resetErrorBoundary={resetErrorBoundary}
              />
          )}
          onReset={() => {
              // reset state
          }}
      >
          <Suspense
              fallback={
                  <>
                      <div>Loading..</div>
                  </>
              }
          >
              <div className="container mx-auto mb-10">
                  <Header
                      handleWorkScroll={handleWorkScroll}
                      handleAboutScroll={handleAboutScroll}
                  />
                  <div className="laptop:mt-20 mob:mt-10">
                      <h1 className="mt-5 text-8xl mob:text-3xl laptop:text-8xl mob:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5">
                          {data.headerTaglineOne} <br />
                          {data.headerTaglineTwo}
                      </h1>
                      <Socials className="mt-5 mob:mt-2 laptop:mt-5" />
                  </div>
                  <div
                      className="mt-40 mob:mt-10 laptop:mt-40 mob:p-2 laptop:p-0"
                      ref={workRef}>
                      <h1 className="text-2xl text-bold">Work.</h1>
                      <div className="mt-10 mob:mt-5 laptop:mt-10 grid grid-cols-2 mob:grid-cols-1 laptop:grid-cols-2 gap-4">
                          {data.projects.map((project, index) => (
                              <WorkCard
                                  key={index}
                                  img={project.imageSrc}
                                  name={project.title}
                                  description={project.description}
                                  onClick={() => window.open(project.url)}
                              />
                          ))}
                      </div>
                  </div>
                  {/* <div className="mt-40 mob:mt-2 laptop:mt-40 mob:p-2 laptop:p-0">
        <h1 className="text-2xl text-bold">Services.</h1>
        <div className="mt-10 grid grid-cols-2 mob:grid-cols-1 laptop:grid-cols-2 gap-6">
          {data.services.map((service, index) => (
            <ServiceCard
              key={index}
              name={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div> */}
                  <div
                      className="mt-40 mob:mt-2 laptop:mt-40 mob:p-2 laptop:p-0"
                      ref={aboutRef}>
                      <h1 className="text-2xl text-bold">About.</h1>
                      <p className="m-5 mob:m-0 laptop:m-5 mob:mt-2 laptop:ml-0 ml-0 text-3xl mob:text-xl laptop:text-3xl w-3/5 mob:w-full laptop:w-3/5">
                          {data.aboutpara}
                      </p>
                  </div>
                  <div className="mt-40 mob:mt-5 laptop:mt-40 mob:p-2 laptop:p-0">
                      <h1 className="text-2xl text-bold">Contact.</h1>
                      <div className="mt-5">
                          <Socials />
                      </div>
                  </div>
                  <h1 className="text-sm text-bold mt-10 mob:mt-2 laptop:mt-10 mob:p-2 laptop:p-0">
                      Made With ❤ by{" "}
                      <Link href="https://github.com/Guohua-Diaz?tab=repositories">
                          <a className="underline underline-offset-1">Guohua Diaz</a>
                      </Link>
                  </h1>
                  <div>

                      {/*<Iframe url="https://www.youtube.com/watch?v=YuXL0xEpbG0"*/}
                      {/*        width="450px"*/}
                      {/*        height="450px"*/}
                      {/*        id="myId"*/}
                      {/*        className="myClassname"*/}
                      {/*        display="initial"*/}
                      {/*        position="relative"/>*/}

                      <h2>My Portfolio Video</h2>
                      <ReactPlayer url='https://www.youtube.com/watch?v=YuXL0xEpbG0' />

                  </div>
              </div>

          </Suspense>
      </ErrorBoundary>


  );
}