export function CartIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='1'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17h-11v-14h-2' />
            <path d='M6 5l14 1l-1 7h-13' />
        </svg>
    )
}

export function SearchIcon() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='1'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <circle cx='10' cy='10' r='7' />
            <line x1='21' y1='21' x2='15' y2='15' />
        </svg>
    );
}

export function MenuIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

export const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );


  export function TrashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 3v1H4v2h16V4h-5V3H9zm2 5v11h2V8h-2zm-4 0v11h2V8H7zm8 0v11h2V8h-2z" />
        </svg>
    );
}


