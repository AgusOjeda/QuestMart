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

export function MailIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M21 8V21H3V8L12 13L21 8Z" />
        </svg>
    );
}


export function ClockIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
        </svg>
    );
}

export function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C8 2 4 6 4 10C4 14 12 22 12 22C12 22 20 14 20 10C20 6 16 2 12 2ZM12 12C10.343 12 9 10.657 9 9C9 7.343 10.343 6 12 6C13.657 6 15 7.343 15 9C15 10.657 13.657 12 12 12Z" />
        </svg>
    );
}


export function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            fill="currentColor"
            className={className}
        >
            <path d="M16.003 2.999c-7.362 0-13.332 5.969-13.332 13.332 0 2.354.618 4.641 1.789 6.656L2 30l7.266-2.368c1.953 1.07 4.149 1.633 6.403 1.633h.002c7.361 0 13.33-5.969 13.33-13.332S23.365 3 16.003 3zm0 24.002h-.002c-1.953 0-3.867-.519-5.551-1.5l-.398-.232-4.312 1.406 1.406-4.148-.258-.43a10.63 10.63 0 01-1.563-5.57c0-5.891 4.804-10.695 10.695-10.695 5.891 0 10.695 4.804 10.695 10.695s-4.804 10.695-10.695 10.695zm5.907-8.347c-.328-.164-1.938-.957-2.238-1.066-.301-.109-.52-.164-.738.164-.219.328-.848 1.066-1.043 1.285-.191.219-.387.246-.715.082-.328-.164-1.383-.512-2.633-1.633-.973-.867-1.629-1.938-1.82-2.266-.191-.328-.02-.508.144-.672.148-.148.328-.383.492-.574.164-.191.219-.328.328-.547.109-.219.055-.41-.027-.574-.082-.164-.738-1.781-1.012-2.441-.266-.641-.535-.555-.738-.566-.191-.008-.41-.01-.629-.01s-.574.082-.875.41c-.301.328-1.148 1.121-1.148 2.738 0 1.617 1.176 3.18 1.34 3.398.164.219 2.316 3.535 5.613 4.949.785.34 1.398.543 1.875.695.787.25 1.504.215 2.07.131.631-.094 1.938-.789 2.215-1.547.273-.758.273-1.406.191-1.547-.082-.141-.301-.219-.629-.383z" />
        </svg>
    );
}
