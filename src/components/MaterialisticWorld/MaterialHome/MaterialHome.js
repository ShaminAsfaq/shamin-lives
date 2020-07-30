import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";

import Routes from '../MaterialRoutes';
import MenuList from "@material-ui/core/MenuList";

import Fab from "@material-ui/core/Fab";
import {Navigation} from "@material-ui/icons";

import './MaterialHome.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const MaterialHome = (props) => {

        const {window} = props;
        const classes = useStyles();

        const theme = useTheme();
        const [mobileOpen, setMobileOpen] = React.useState(false);


        // Selected Item Ref
        const [selectedItemRef, setSelectedItemRef] = useState('');
        const [selectedComponent, setSelectedComponent] = useState(Routes[0].component);
        const [selectedItem, setSelectedItem] = useState(0);
        const [navbarTitle, setNavbarTitle] = useState(Routes[0].navbarName);

        const activeRoute = (routeName) => {
            return props.location.pathname.indexOf(routeName) > -1;
        }

        const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
        };

        const drawer = (
            <div>
                <div className={classes.toolbar} id='navigation'>
                    {/*<Navigation className={classes.extendedIcon} />*/}
                    <ListItemText primary="Hello There" secondary="Make yourself home"/>
                </div>
                <Divider/>
                <MenuList>
                    {
                        Routes.map((text, index) => (

                            <ListItem
                                selected={selectedItem === index}
                                key={index}
                                button
                                onClick={() => {
                                    setSelectedComponent(text.component);
                                    setSelectedItem(index);
                                    setNavbarTitle(text.navbarName);
                                }}
                            >
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text.sidebarName}/>
                            </ListItem>

                        ))
                    }
                </MenuList>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        const container = window !== undefined ? () => window().document.body : undefined;


        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {navbarTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {
                        !selectedComponent ?
                            <div>
                                <Typography paragraph>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt
                                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit
                                    laoreet
                                    id
                                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
                                    suscipit
                                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh
                                    cras.
                                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
                                    quis
                                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At
                                    augue
                                    eget
                                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
                                    Lorem
                                    donec massa sapien faucibus et molestie ac.
                                </Typography>
                                < Typography paragraph>
                                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget
                                    nulla
                                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
                                    volutpat
                                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
                                    risus
                                    sed
                                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
                                    In
                                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam
                                    sem et
                                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
                                    sollicitudin
                                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
                                    maecenas
                                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis
                                    orci
                                    a.
                                </Typography>
                            </div> :
                            selectedComponent
                    }
                </main>
            </div>
        );
    }
;

MaterialHome.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default MaterialHome;