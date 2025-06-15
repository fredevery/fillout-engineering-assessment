import { useEffect, useRef, useCallback } from "react";
import { Flag, PenLine, Clipboard, Copy, Trash2 } from "lucide-react";
import styles from './PageNodeContextMenu.module.css';
import { useEditablePages } from "@/app/hooks/useEditablePages";

const MENU_ITEMS = [
    { 
        label: 'Set as first page', 
        action: () => console.log('Set as first page'),
        icon: <Flag size={14} strokeWidth={1.75} />
    },
    { 
        label: 'Rename', 
        action: () => console.log('Rename'),
        icon: <PenLine size={14} strokeWidth={1.75} />
    },
    { 
        label: 'Copy', 
        action: () => console.log('Copy'),
        icon: <Clipboard size={14} strokeWidth={1.75} />
    },
    { 
        label: 'Duplicate', 
        action: () => console.log('Duplicate'),
        icon: <Copy size={14} strokeWidth={1.75} />
    },
    { 
        label: 'Delete', 
        action: () => console.log('Delete'),
        icon: <Trash2 size={14} strokeWidth={1.75} />,
        className: styles.danger
    },
]

export default function PageNodeContextMenu() {
    const { showContextMenu, closeContextMenu, setContextMenuPageId } = useEditablePages();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            if (showContextMenu) {
                closeContextMenu();
            }
        }
    }, [showContextMenu, closeContextMenu]);

    const handleTransitionEnd = useCallback(() => {
        if (showContextMenu) return;
        setContextMenuPageId("");
    }, [showContextMenu, setContextMenuPageId]);

    useEffect(() => {
        menuRef.current?.classList.toggle(styles.show, showContextMenu);
        if (showContextMenu) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [showContextMenu, handleClickOutside])

    return (
        <div ref={menuRef} className={styles.pageNodeContextMenu} onTransitionEnd={handleTransitionEnd}>
            <div className={styles.contextMenuHeader}>
                <h3>Settings</h3>
            </div>
            <ul className={styles.contextMenuList}>
                {MENU_ITEMS.map((item, index) => (
                    <li key={index} className={[styles.contextMenuItem, item.className].join(' ')}>
                        <button onClick={item.action} className={styles.contextMenuButton}>
                            {item.icon && <span className={styles.icon}>{item.icon}</span>}
                            <label>{item.label}</label>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}