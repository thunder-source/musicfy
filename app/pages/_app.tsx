// import type { AppProps } from 'next/app';
// import { useRouter } from 'next/router';

// import { ThemeProvider } from 'next-themes';

// import MainLayout from '../layout/main-layout';
// import '@/styles/globals.css';
// import { Theme } from '@radix-ui/themes';

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default function App({ Component, pageProps }: AppProps) {
//   const router = useRouter();
//   return (
//     <ThemeProvider attribute='class' defaultTheme='light'>
//       <Theme
//         accentColor='crimson'
//         grayColor='sand'
//         radius='large'
//         scaling='95%'>
//         <MainLayout>
//           <Component key={router.asPath} {...pageProps} />
//         </MainLayout>
//       </Theme>
//     </ThemeProvider>
//   );
// }
