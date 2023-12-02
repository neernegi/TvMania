// import { Box, Button, Flex, HStack, Heading, Text } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { auth } from "../../firebase.config";

// import { fetchDataFromApi } from "../../api/tvMania";
// import useFetch from "../../utils/useFetchApi";

// const getCurrentUser = async () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         resolve(user);
//       } else {
//         resolve(null);
//       }
//       unsubscribe();
//     });
//   });
// };

// const Header = () => {
//   const [user, setUser] = useState(null);
//   const [genreOptions, setGenreOptions] = useState([]);
//   const [mediaType, setMediaType] = useState("");
//   const [isGenreOptionsVisible, setIsGenreOptionsVisible] = useState(false);
//   const [genreOptionsPosition, setGenreOptionsPosition] = useState({
//     left: 0,
//     top: 0,
//   });
//   // const { mediaType } = useParams();
//   const navigate = useNavigate();

//   // const { data } = useFetch(`/genre/movie/list`);

//   const fetchGenreOptions = async () => {
//     try {
//       const response = await fetchDataFromApi(`/genre/${mediaType}/list`);
//       setGenreOptions(response.genres);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchCurrentUser = async () => {
//     const currentUser = await getCurrentUser();
//     setUser(currentUser);
//   };

//   const logoutUser = async () => {
//     await auth.signOut();
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       alert("Logout successful");
//       navigate("/");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const handleGenreButtonHover = (mediaType, event) => {
//     setIsGenreOptionsVisible(true);
//     setMediaType(mediaType);

//     const buttonRect = event.target.getBoundingClientRect();
//     const genreOptionsLeft = buttonRect.left;
//     const genreOptionsTop = buttonRect.top + buttonRect.height;
//     setGenreOptionsPosition({ left: genreOptionsLeft, top: genreOptionsTop });
//   };

//   const handleGenreButtonLeave = () => {
//     setIsGenreOptionsVisible(false);
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//     fetchGenreOptions();
//   }, [mediaType]);

//   return (
//     <Flex
//       justifyContent={"center"}
//       bg="gray.300"
//       p={4}
//       gap={"17rem"}
//       position={"sticky"}
//       zIndex={1}
//     >
//       <Heading
//         marginLeft={"-46rem"}
//         fontFamily={"cursive"}
//         as="h1"
//         size="xl"
//         mr={4}
//       >
//         TvMania
//       </Heading>
//       <HStack
//         gap={"2rem"}
//         fontWeight={"bold"}
//         fontFamily={"cursive"}
//         justifyItems={"center"}
//       >
//         <Button fontSize={"2rem"} colorScheme="black" variant="link">
//           <Link to={"/"} mr={4}>
//             Home
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link
//             to={"/tvshows"}
//             mr={4}
//             onMouseEnter={(event) => handleGenreButtonHover("tv", event)}
//             onMouseLeave={handleGenreButtonLeave}
//           >
//             TvShows
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link
//             to={"/movies"}
//             mr={4}
//             onMouseEnter={(event) => handleGenreButtonHover("movie", event)}
//             onMouseLeave={handleGenreButtonLeave}
//           >
//             Movies
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link to={"/anime"} mr={4}>
//             Anime
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link href="#" mr={4}>
//             WatchList
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link href="#" mr={4}>
//             People
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link href="#" mr={4}>
//             Web Channels
//           </Link>
//         </Button>
//         <Button fontSize={"2rem"} color={"whiteAlpha.900"} variant="link">
//           <Link href="#" mr={4}>
//             Network
//           </Link>
//         </Button>
//         {!user ? (
//           <>
//             <Button fontSize={"2rem"} colorScheme="black" variant="link">
//               <Link to={"/login"} mr={4}>
//                 Login
//               </Link>
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button
//               fontSize={"2rem"}
//               colorScheme="black"
//               variant="link"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//             <Button fontSize={"2rem"} colorScheme="black" variant="link">
//               <Link mr={4}>Profile</Link>
//             </Button>
//           </>
//         )}
//         {isGenreOptionsVisible && (
//           <Box
//             display="flex"
//             flexDirection="column"
//             position="absolute"
//             bottom={0}
//             left={genreOptionsPosition.left}
//             top={genreOptionsPosition.top}
//             bgColor="white"
//             ml={"-4.6rem"}
//             p={4}
//             zIndex={2}
//             boxShadow="md"
//             borderRadius="md"
//             onMouseEnter={() => setIsGenreOptionsVisible(true)}
//             onMouseLeave={() => setIsGenreOptionsVisible(false)}
//           >
//             {genreOptions.map((genre) => (
//               <Button
//                 key={genre.id}
//                 fontSize={"2rem"}
//                 colorScheme="black"
//                 variant="link"
//                 as={Link}
//                 to={`/filter/${mediaType}/${genre?.name}`}
//               >
//                 {genre?.name}
//               </Button>
//             ))}
//           </Box>
//         )}
//       </HStack>
//     </Flex>
//   );
// };

// export default Header;
