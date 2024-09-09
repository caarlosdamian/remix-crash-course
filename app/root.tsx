import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styles from './styles/main.css';
import MainNavigation from './components/MainNavegation';
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// export const ErrorBoundary = ({ error }) => {
//   console.log(error)
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//         <title>Error </title>
//       </head>
//       <body>
//         <header>
//           <MainNavigation />
//         </header>
//         <main>
//           <h1>An error occurd</h1>
//           {/* <p>{error.message}</p> */}
//           <p>
//             Back to <Link to="/">safety</Link>
//           </p>
//         </main>
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// };

export default function App() {
  return <Outlet />;
}
