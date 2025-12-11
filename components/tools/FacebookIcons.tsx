
import React, { useState, useMemo } from 'react';
import { Copy, Check, X, Search, Grid, List } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho Icon
type IconItem = {
  char: string;
  keywords: string; // Từ khóa tìm kiếm (tiếng Việt không dấu & có dấu)
};

type IconCategory = {
  id: string;
  label: string;
  icons: IconItem[];
};

// Dữ liệu Icon mở rộng
const ICON_DATA: IconCategory[] = [
  {
    id: 'smileys',
    label: 'Cảm xúc & Nụ cười',
    icons: [
      { char: '😀', keywords: 'cuoi smile happy vui' },
      { char: '😃', keywords: 'cuoi smile happy vui' },
      { char: '😄', keywords: 'cuoi smile happy vui' },
      { char: '😁', keywords: 'cuoi rang smile happy' },
      { char: '😆', keywords: 'cuoi tit mat smile laugh' },
      { char: '😅', keywords: 'cuoi toat mo hoi sweat smile' },
      { char: '🤣', keywords: 'cuoi lan lon laugh cry' },
      { char: '😂', keywords: 'cuoi ra nuoc mat joy cry' },
      { char: '🙂', keywords: 'cuoi nhe smile' },
      { char: '🙃', keywords: 'cuoi nguoc upside down' },
      { char: '😉', keywords: 'nhay mat wink' },
      { char: '😊', keywords: 'cuoi mim blush' },
      { char: '😇', keywords: 'thien than angel' },
      { char: '🥰', keywords: 'yeu love hearts' },
      { char: '😍', keywords: 'yeu love heart eyes' },
      { char: '🤩', keywords: 'sao star struck' },
      { char: '😘', keywords: 'hon kiss' },

      { char: '😚', keywords: 'hon kiss closed eyes' },
      { char: '😙', keywords: 'hon kiss smiling eyes' },
      { char: '😋', keywords: 'ngon yum' },
      { char: '😛', keywords: 'le luoi tongue' },
      { char: '😜', keywords: 'le luoi nhay mat wink tongue' },
      { char: '🤪', keywords: 'dien zany' },
      { char: '😝', keywords: 'le luoi squint tongue' },
      { char: '🤑', keywords: 'tien money' },
      { char: '🤗', keywords: 'om hug' },
      { char: '🤭', keywords: 'che mieng hand over mouth' },
      { char: '🤫', keywords: 'im lang shush' },
      { char: '🤔', keywords: 'suy nghi think' },
      { char: '🤐', keywords: 'khoa mieng zipper' },
      { char: '🤨', keywords: 'nhuong may raised eyebrow' },
      { char: '😐', keywords: 'binh thuong neutral' },
      { char: '😑', keywords: 'vo cam expressionless' },
      { char: '😶', keywords: 'khong loi no mouth' },

      { char: '😒', keywords: 'kho chiu unamused' },
      { char: '🙄', keywords: 'dao mat rolling eyes' },
      { char: '😬', keywords: 'nhan nho grimacing' },
      { char: '🤥', keywords: 'noi doi lying' },
      { char: '😌', keywords: 'nhe nhom relieved' },
      { char: '😔', keywords: 'buon pensive' },
      { char: '😪', keywords: 'buon ngu sleepy' },
      { char: '🤤', keywords: 'them drooling' },
      { char: '😴', keywords: 'ngu sleeping' },
      { char: '😷', keywords: 'khau trang mask' },
      { char: '🤒', keywords: 'om sot thermometer' },
      { char: '🤕', keywords: 'bang bo bandage' },
      { char: '🤢', keywords: 'buon non nauseated' },
      { char: '🤮', keywords: 'non vomit' },
      { char: '🤧', keywords: 'hat xi sneezing' },
      { char: '🥵', keywords: 'nong hot' },
      { char: '🥶', keywords: 'lanh cold' },
      { char: '🥴', keywords: 'say woozy' },
      { char: '😵', keywords: 'chong mat dizzy' },
      { char: '🤯', keywords: 'no tung dau exploding head' },
      { char: '🤠', keywords: 'cao boi cowboy' },
      { char: '🥳', keywords: 'tiec tung party' },
      { char: '😎', keywords: 'ngau cool' },
      { char: '🤓', keywords: 'mot sach nerd' },
      { char: '🧐', keywords: 'soi monocle' },
      { char: '😕', keywords: 'boi roi confused' },
      { char: '😟', keywords: 'lo lang worried' },
      { char: '🙁', keywords: 'buon nhe slight frown' },
      { char: '😮', keywords: 'ngac nhien open mouth' },
      { char: '😯', keywords: 'ngac nhien hushed' },
      { char: '😲', keywords: 'kinh ngac astonished' },
      { char: '😳', keywords: 'do mat flushed' },
      { char: '🥺', keywords: 'cau xin pleading' },
      { char: '😦', keywords: 'frowning' },

      { char: '😭', keywords: 'khoc to loud cry' },
      { char: '😱', keywords: 'so hai scream' },
      { char: '😖', keywords: 'boi roi confounded' },

      { char: '😡', keywords: 'gian du rage' },
      { char: '😠', keywords: 'gian angry' },
      { char: '🤬', keywords: 'chui the cursing' },
      { char: '😈', keywords: 'ac quy smile devil' },
      { char: '👿', keywords: 'ac quy buon imp' },
      { char: '💀', keywords: 'dau lau skull' },
      { char: '☠️', keywords: 'dau lau xuong cheo skull crossbones' },
      { char: '💩', keywords: 'cut poo' },
      { char: '🤡', keywords: 'chu he clown' },
      { char: '👹', keywords: 'quy ogre' },
      { char: '👺', keywords: 'yeu quai goblin' },
      { char: '👻', keywords: 'ma ghost' },
      { char: '👽', keywords: 'nguoi ngoai hanh tinh alien' },
      { char: '👾', keywords: 'game monster' },
      { char: '🤖', keywords: 'robot' }
    ]
  },
  {
    id: 'gestures',
    label: 'Cử chỉ & Con người',
    icons: [
      { char: '👋', keywords: 'vay tay wave' },
      { char: '🤚', keywords: 'gio tay back of hand' },
      { char: '🖐️', keywords: 'ban tay hand' },
      { char: '✋', keywords: 'dung lai stop raised hand' },
      { char: '🖖', keywords: 'vulcan' },
      { char: '👌', keywords: 'ok' },
      { char: '🤌', keywords: 'y pinched fingers' },
      { char: '🤏', keywords: 'mot chut pinching hand' },
      { char: '✌️', keywords: 'hai victory' },
      { char: '🤞', keywords: 'chuc may man crossed fingers' },
      { char: '🤟', keywords: 'yeu love you' },
      { char: '🤘', keywords: 'rock' },
      { char: '🤙', keywords: 'goi dien call me' },
      { char: '👈', keywords: 'chi trai left' },
      { char: '👉', keywords: 'chi phai right' },
      { char: '👆', keywords: 'chi len up' },
      { char: '🖕', keywords: 'ngon giua middle finger' },
      { char: '👇', keywords: 'chi xuong down' },
      { char: '👍', keywords: 'thich like thumbs up' },
      { char: '👎', keywords: 'khong thich dislike thumbs down' },
      { char: '✊', keywords: 'nam dam fist' },
      { char: '👊', keywords: 'dam fist' },
      { char: '👏', keywords: 'vo tay clap' },
      { char: '🙌', keywords: 'hoan ho raising hands' },
      { char: '👐', keywords: 'mo tay open hands' },
      { char: '🤲', keywords: 'long ban tay palms up' },
      { char: '🤝', keywords: 'bat tay handshake' },
      { char: '🙏', keywords: 'cau nguyen pray' },
      { char: '✍️', keywords: 'viet write' },
      { char: '💅', keywords: 'mong tay nail polish' },
      { char: '🤳', keywords: 'tu suong selfie' },
      { char: '💪', keywords: 'khoe co bap muscle' },
      { char: '🧠', keywords: 'nao brain' },
      { char: '🫀', keywords: 'tim heart organ' },
      { char: '👀', keywords: 'mat eyes' },
      { char: '👁️', keywords: 'mat eye' },
      { char: '👅', keywords: 'luoi tongue' },
      { char: '👄', keywords: 'mieng mouth' },
      { char: '👶', keywords: 'em be baby' },
      { char: '🧒', keywords: 'tre em child' },
      { char: '👦', keywords: 'be trai boy' },
      { char: '👧', keywords: 'be gai girl' },
      { char: '🧑', keywords: 'nguoi person' },
      { char: '👱', keywords: 'toc vang blond' },
      { char: '👨', keywords: 'dan ong man' },
      { char: '🧔', keywords: 'rau beard' },
      { char: '👩', keywords: 'phu nu woman' },
      { char: '🧓', keywords: 'nguoi gia older person' },
      { char: '👴', keywords: 'ong gia old man' },
      { char: '👵', keywords: 'ba gia old woman' },
      { char: '👮', keywords: 'canh sat police' },
      { char: '🕵️', keywords: 'tham tu detective' },
      { char: '💂', keywords: 'linh guard' },
      { char: '👷', keywords: 'cong nhan construction worker' },
      { char: '🤴', keywords: 'hoang tu prince' },
      { char: '👸', keywords: 'cong chua princess' },
      { char: '👳', keywords: 'khan turban' },
      { char: '👲', keywords: 'mu trung quoc chinese cap' },
      { char: '🧕', keywords: 'khan trum headscarf' },
      { char: '🤵', keywords: 'chu re tuxedo' },
      { char: '👰', keywords: 'co dau veil' },
      { char: '🤰', keywords: 'ba bau pregnant' },
      { char: '🤱', keywords: 'cho con bu breast feeding' }
    ]
  },
  {
    id: 'hearts',
    label: 'Trái tim & Tình yêu',
    icons: [
      { char: '❤️', keywords: 'tim do heart red' },
      { char: '🧡', keywords: 'tim cam heart orange' },
      { char: '💛', keywords: 'tim vang heart yellow' },
      { char: '💚', keywords: 'tim xanh la heart green' },
      { char: '💙', keywords: 'tim xanh duong heart blue' },
      { char: '💜', keywords: 'tim tim heart purple' },
      { char: '🤎', keywords: 'tim nau heart brown' },
      { char: '🖤', keywords: 'tim den heart black' },
      { char: '🤍', keywords: 'tim trang heart white' },
      { char: '💔', keywords: 'tim vo broken heart' },
      { char: '❣️', keywords: 'tim cham than exclamation' },
      { char: '💕', keywords: 'hai tim two hearts' },
      { char: '💞', keywords: 'tim xoay revolving hearts' },
      { char: '💓', keywords: 'tim dap beating heart' },
      { char: '💗', keywords: 'tim lon dan growing heart' },
      { char: '💖', keywords: 'tim lap lanh sparkles heart' },
      { char: '💘', keywords: 'tim mui ten cupid' },
      { char: '💝', keywords: 'tim hop qua gift heart' },
      { char: '💟', keywords: 'tim trang tri decoration' },
      { char: '💌', keywords: 'thu tinh love letter' },
      { char: '💋', keywords: 'dau hon kiss mark' },
      { char: '💍', keywords: 'nhan ring' },
      { char: '💎', keywords: 'kim cuong gem' }
    ]
  },
  {
    id: 'nature',
    label: 'Động vật & Thiên nhiên',
    icons: [
      { char: '🐶', keywords: 'cho dog' },
      { char: '🐱', keywords: 'meo cat' },
      { char: '🐭', keywords: 'chuot mouse' },
      { char: '🐹', keywords: 'chuot hamster' },
      { char: '🐰', keywords: 'tho rabbit' },
      { char: '🦊', keywords: 'cao fox' },
      { char: '🐻', keywords: 'gau bear' },
      { char: '🐼', keywords: 'gau truc panda' },
      { char: '🐨', keywords: 'gấu koala' },
      { char: '🐯', keywords: 'ho tiger' },
      { char: '🦁', keywords: 'su tu lion' },
      { char: '🐮', keywords: 'bo cow' },
      { char: '🐷', keywords: 'heo pig' },
      { char: '🐽', keywords: 'mui heo pig nose' },
      { char: '🐸', keywords: 'ech frog' },
      { char: '🐵', keywords: 'khi monkey' },
      { char: '🐔', keywords: 'ga chicken' },
      { char: '🐧', keywords: 'chim canh cut penguin' },
      { char: '🐦', keywords: 'chim bird' },
      { char: '🐤', keywords: 'ga con chick' },
      { char: '🦆', keywords: 'vit duck' },
      { char: '🦅', keywords: 'dai bang eagle' },
      { char: '🦉', keywords: 'cu owl' },
      { char: '🦇', keywords: 'doi bat' },
      { char: '🐺', keywords: 'soi wolf' },
      { char: '🐗', keywords: 'heo rung boar' },
      { char: '🐴', keywords: 'ngua horse' },
      { char: '🦄', keywords: 'ky lan unicorn' },
      { char: '🐝', keywords: 'ong bee' },
      { char: '🐛', keywords: 'sau bug' },
      { char: '🦋', keywords: 'buom butterfly' },
      { char: '🐌', keywords: 'oc sen snail' },
      { char: '🐞', keywords: 'bo canh cung beetle' },
      { char: '🐜', keywords: 'kien ant' },
      { char: '🦟', keywords: 'muoi mosquito' },
      { char: '🕷️', keywords: 'nhen spider' },
      { char: '🕸️', keywords: 'mang nhen web' },
      { char: '🐢', keywords: 'rua turtle' },
      { char: '🐍', keywords: 'ran snake' },
      { char: '🦎', keywords: 'than lan lizard' },
      { char: '🐙', keywords: 'bach tuoc octopus' },
      { char: '🦑', keywords: 'muc squid' },
      { char: '🦐', keywords: 'tom shrimp' },
      { char: '🦞', keywords: 'tom hum lobster' },
      { char: '🦀', keywords: 'cua crab' },
      { char: '🐡', keywords: 'ca noc puffer' },
      { char: '🐟', keywords: 'ca fish' },
      { char: '🐬', keywords: 'ca heo dolphin' },
      { char: '🐳', keywords: 'ca voi whale' },
      { char: '🦈', keywords: 'ca map shark' },
      { char: '🐊', keywords: 'ca sau crocodile' },
      { char: '🐅', keywords: 'ho tiger' },
      { char: '🐆', keywords: 'bao leopard' },
      { char: '🦓', keywords: 'ngua van zebra' },
      { char: '🦍', keywords: 'khi dot gorilla' },
      { char: '🐘', keywords: 'voi elephant' },
      { char: '🦛', keywords: 'ha ma hippo' },
      { char: '🦏', keywords: 'te giac rhino' },
      { char: '🐪', keywords: 'lac da camel' },
      { char: '🦒', keywords: 'huou cao co giraffe' },
      { char: '🦘', keywords: 'chuot tui kangaroo' },
      { char: '💐', keywords: 'bo hoa bouquet' },
      { char: '🌸', keywords: 'hoa anh dao cherry blossom' },
      { char: '💮', keywords: 'hoa trang white flower' },
      { char: '🌹', keywords: 'hoa hong rose' },
      { char: '🥀', keywords: 'hoa heo wilted flower' },
      { char: '🌺', keywords: 'hoa hibiscus' },
      { char: '🌻', keywords: 'hoa huong duong sunflower' },
      { char: '🌼', keywords: 'hoa cuc blossom' },
      { char: '🌷', keywords: 'hoa tulip' },
      { char: '🌱', keywords: 'mam seedling' },
      { char: '🌲', keywords: 'cay thong evergreen tree' },
      { char: '🌳', keywords: 'cay tree' },
      { char: '🌴', keywords: 'cay dua palm tree' },
      { char: '🌵', keywords: 'xuong rong cactus' },
      { char: '🌾', keywords: 'lua sheaf of rice' },
      { char: '🌿', keywords: 'thao moc herb' },
      { char: '☘️', keywords: 'co 3 la shamrock' },
      { char: '🍀', keywords: 'co 4 la four leaf clover' },
      { char: '🍁', keywords: 'la phong maple leaf' },
      { char: '🍂', keywords: 'la roi fallen leaf' },
      { char: '🍃', keywords: 'la bay leaf fluttering' }
    ]
  },
  {
    id: 'food',
    label: 'Đồ ăn & Thức uống',
    icons: [
      { char: '🍇', keywords: 'nho grapes' },
      { char: '🍈', keywords: 'dua luoi melon' },
      { char: '🍉', keywords: 'dua hau watermelon' },
      { char: '🍊', keywords: 'quyt tangerine' },
      { char: '🍋', keywords: 'chanh lemon' },
      { char: '🍌', keywords: 'chuoi banana' },
      { char: '🍍', keywords: 'thom dua pineapple' },
      { char: '🥭', keywords: 'xoai mango' },
      { char: '🍎', keywords: 'tao do apple red' },
      { char: '🍏', keywords: 'tao xanh apple green' },
      { char: '🍐', keywords: 'le pear' },
      { char: '🍑', keywords: 'dao peach' },
      { char: '🍒', keywords: 'cherry' },
      { char: '🍓', keywords: 'dau tay strawberry' },
      { char: '🥝', keywords: 'kiwi' },
      { char: '🍅', keywords: 'ca chua tomato' },
      { char: '🥥', keywords: 'dua coconut' },
      { char: '🥑', keywords: 'bo avocado' },
      { char: '🍆', keywords: 'ca tim eggplant' },
      { char: '🥔', keywords: 'khoai tay potato' },
      { char: '🥕', keywords: 'ca rot carrot' },
      { char: '🌽', keywords: 'bap corn' },
      { char: '🌶️', keywords: 'ot hot pepper' },
      { char: '🥒', keywords: 'dua leo cucumber' },
      { char: '🥦', keywords: 'bong cai broccoli' },
      { char: '🍄', keywords: 'nam mushroom' },
      { char: '🥜', keywords: 'dau phong peanuts' },
      { char: '🍞', keywords: 'banh mi bread' },
      { char: '🥐', keywords: 'sung trau croissant' },
      { char: '🥖', keywords: 'banh mi phap baguette' },
      { char: '🥨', keywords: 'banh quy pretzel' },
      { char: '🥯', keywords: 'bagel' },
      { char: '🥞', keywords: 'banh kep pancakes' },
      { char: '🧀', keywords: 'pho mai cheese' },
      { char: '🍖', keywords: 'thit meat' },
      { char: '🍗', keywords: 'dui ga poultry leg' },
      { char: '🥩', keywords: 'thit bo steak' },
      { char: '🥓', keywords: 'thit xong khoi bacon' },
      { char: '🍔', keywords: 'hamburger' },
      { char: '🍟', keywords: 'khoai tay chien fries' },
      { char: '🍕', keywords: 'pizza' },
      { char: '🌭', keywords: 'xuc xich hot dog' },
      { char: '🥪', keywords: 'sandwich' },
      { char: '🌮', keywords: 'taco' },
      { char: '🌯', keywords: 'burrito' },
      { char: '🥚', keywords: 'trung egg' },
      { char: '🍳', keywords: 'nau an cooking' },
      { char: '🍿', keywords: 'bong ngo popcorn' },
      { char: '🍚', keywords: 'com rice' },
      { char: '🍝', keywords: 'mi y spaghetti' },
      { char: '🍣', keywords: 'sushi' },
      { char: '🍦', keywords: 'kem ice cream' },
      { char: '🍩', keywords: 'banh vong donut' },
      { char: '🍪', keywords: 'banh quy cookie' },
      { char: '🍰', keywords: 'banh kem cake' },
      { char: '🍫', keywords: 'socola chocolate' },
      { char: '🍬', keywords: 'keo candy' },
      { char: '🍭', keywords: 'keo mut lollipop' },
      { char: '🥛', keywords: 'sua milk' },
      { char: '☕', keywords: 'ca phe coffee' },
      { char: '🍵', keywords: 'tra tea' },
      { char: '🍶', keywords: 'ruou sake' },
      { char: '🍷', keywords: 'ruou vang wine' },
      { char: '🍸', keywords: 'cocktail' },
      { char: '🍺', keywords: 'bia beer' },
      { char: '🍻', keywords: 'cung ly cheers' },
      { char: '🥃', keywords: 'ruou whiskey' }
    ]
  },
  {
    id: 'activity',
    label: 'Hoạt động & Thể thao',
    icons: [
      { char: '⚽', keywords: 'bong da soccer ball' },
      { char: '🏀', keywords: 'bong ro basketball' },
      { char: '🏈', keywords: 'bong bau duc football' },
      { char: '⚾', keywords: 'bong chay baseball' },
      { char: '🥎', keywords: 'bong mem softball' },
      { char: '🎾', keywords: 'quan vot tennis' },
      { char: '🏐', keywords: 'bong chuyen volleyball' },
      { char: '🏉', keywords: 'bong bau duc rugby' },
      { char: '🥏', keywords: 'dia bay frisbee' },
      { char: '🎱', keywords: 'bida pool 8 ball' },
      { char: '🏓', keywords: 'bong ban ping pong' },
      { char: '🏸', keywords: 'cau long badminton' },
      { char: '🥊', keywords: 'dam boc boxing glove' },
      { char: '🥋', keywords: 'vo thuat martial arts' },
      { char: '🥅', keywords: 'khung thanh goal net' },
      { char: '🏹', keywords: 'ban cung archery' },
      { char: '🎣', keywords: 'cau ca fishing pole' },
      { char: '🎽', keywords: 'chay running shirt' },
      { char: '🎿', keywords: 'truot tuyet ski' },
      { char: '🛷', keywords: 'xe truot sled' },
      { char: '🥌', keywords: 'curling stone' },
      { char: '⛸️', keywords: 'truot bang ice skate' },
      { char: '🎳', keywords: 'bowling' },
      { char: '🎮', keywords: 'game video game' },
      { char: '🎰', keywords: 'may xeng slot machine' },
      { char: '🎨', keywords: 'nghe thuat artist palette' },
      { char: '🎪', keywords: 'rap xiec circus tent' },
      { char: '🎫', keywords: 've ticket' },
      { char: '🏆', keywords: 'cup trophy' },
      { char: '🥇', keywords: 'huy chuong medal' },
      { char: '🥇', keywords: 'nhat 1st place' },
      { char: '🥈', keywords: 'nhi 2nd place' },
      { char: '🥉', keywords: 'ba 3rd place' }
    ]
  },
  {
    id: 'objects',
    label: 'Đồ vật & Biểu tượng',
    icons: [
      { char: '✨', keywords: 'lap lanh sparkles' },
      { char: '⭐', keywords: 'sao star' },
      { char: '🌟', keywords: 'sao lap lanh glowing star' },
      { char: '💫', keywords: 'sao choang dizzy' },
      { char: '💥', keywords: 'no collision' },
      { char: '💢', keywords: 'gian anger' },
      { char: '💦', keywords: 'nuoc sweat droplets' },
      { char: '💧', keywords: 'giot nuoc droplet' },
      { char: '💤', keywords: 'ngu zzz' },
      { char: '💨', keywords: 'khoi dashing' },
      { char: '🔥', keywords: 'lua fire' },
      { char: '🎈', keywords: 'bong bay balloon' },
      { char: '🎉', keywords: 'phao giay party popper' },
      { char: '🎊', keywords: 'qua cau confetti ball' },
      { char: '🎋', keywords: 'cay tre tanabata tree' },
      { char: '🎍', keywords: 'tre pine decoration' },
      { char: '🎎', keywords: 'bup be dolls' },
      { char: '🎏', keywords: 'co ca chep carp streamer' },
      { char: '🎐', keywords: 'chuong gio wind chime' },
      { char: '🎑', keywords: 'le hoi moon viewing' },
      { char: '🎀', keywords: 'no ribbon' },
      { char: '🎁', keywords: 'qua gift' },
      { char: '🎗️', keywords: 'ruy bang reminder ribbon' },
      { char: '🎟️', keywords: 've admission tickets' },
      { char: '🎫', keywords: 've ticket' }
    ]
  }
];

export const FacebookIcons = () => {
  const [selectedIcons, setSelectedIcons] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleIconClick = (icon: string) => {
    setSelectedIcons(prev => prev + icon);
  };

  const handleCopy = () => {
    if (!selectedIcons) return;
    navigator.clipboard.writeText(selectedIcons);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setSelectedIcons('');
  };

  // Logic tìm kiếm nâng cao
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return ICON_DATA;

    const lowerQuery = searchQuery.toLowerCase().trim();

    // Hàm chuẩn hóa chuỗi (bỏ dấu tiếng Việt) để tìm kiếm không dấu
    const normalize = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const normalizedQuery = normalize(lowerQuery);

    return ICON_DATA.map(category => {
      // Lọc các icon khớp với từ khóa
      const filteredIcons = category.icons.filter(icon => {
        const keywords = icon.keywords.toLowerCase();
        const normalizedKeywords = normalize(keywords);
        return keywords.includes(lowerQuery) || normalizedKeywords.includes(normalizedQuery);
      });

      return {
        ...category,
        icons: filteredIcons
      };
    }).filter(category => category.icons.length > 0); // Chỉ giữ lại category có icon
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search Input (Moved to top) */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm icon (VD: cười, khóc, tim, chó, mèo...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-500 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Input Area (Sticky) */}
      <div className="bg-white p-4 rounded-2xl border-2 border-blue-100 shadow-md sticky top-20 z-20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Icon đã chọn</span>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
              title="Xóa tất cả"
            >
              <X size={14} /> Xóa
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={selectedIcons}
            readOnly
            placeholder="Click vào icon bên dưới để chọn..."
            className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-4 text-2xl tracking-widest text-slate-900 outline-none resize-none focus:border-blue-400 transition-all"
          ></textarea>
          <button
            onClick={handleCopy}
            disabled={!selectedIcons}
            className={`absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${!selectedIcons ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95'}`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Đã copy' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Search & Grid */}
      <div className="space-y-6">
        <div className="space-y-8">
          {filteredData.length > 0 ? filteredData.map((group) => (
            <div key={group.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 text-sm uppercase">{group.label}</h3>
                <span className="text-xs text-slate-400 font-medium">{group.icons.length} icons</span>
              </div>
              <div className="p-4 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                {group.icons.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleIconClick(item.char)}
                    className="aspect-square flex items-center justify-center text-2xl hover:bg-blue-50 hover:scale-125 transition-all rounded-lg cursor-pointer select-none"
                    title={item.keywords}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            </div>
          )) : (
            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
              <div className="flex justify-center mb-3">
                <Search size={48} className="text-slate-200" />
              </div>
              <p>Không tìm thấy icon nào phù hợp với "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
