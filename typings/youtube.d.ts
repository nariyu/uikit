declare namespace YT {
  const Player: {
    prototype: Player;

    /**
     * コンストラクタ
     *
     * @param id DOM 要素、または HTML 要素の id を指定しています。ここに、プレーヤーが含まれる <iframe> タグが API によって挿入されます。IFrame API は指定された要素を、プレーヤーが含まれる <iframe> 要素に置き換えます。置換される要素の表示スタイルが、挿入される <iframe> 要素のスタイルと異なっている場合、ページのレイアウトが影響を受けます。デフォルトで、<iframe> が inline-block 要素として表示されます。
     * @param options プレーヤーのオプションを指定するオブジェクトです。
     */
    new (id: string | Element, options: PlayerOptions): Player;
  };

  const PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };
  type ValueOf<T> = T[keyof T];
  type PlayerState = {
    UNSTARTED: typeof PlayerState.UNSTARTED;
    ENDED: typeof PlayerState.ENDED;
    PLAYING: typeof PlayerState.PLAYING;
    PAUSED: typeof PlayerState.PAUSED;
    BUFFERING: typeof PlayerState.BUFFERING;
    CUED: typeof PlayerState.CUED;
  };

  type QualityLevels =
    | 'highres'
    | 'hd1080'
    | 'hd720'
    | 'large'
    | 'medium'
    | 'small';

  interface PlayerOptions {
    width: number;
    height: number;
    videoId: string;
    playerVars: Partial<PlayerVars>;
    events: Partial<PlayerEvents>;
  }

  interface Player {
    /**
     * 頭出し済み、または読み込み済みの動画を再生します。この関数を実行した後のプレーヤーの最終的な状態は playing（1）になります。
     */
    playVideo: () => void;

    /**
     * 再生中の動画を一時停止します。この関数を実行した後のプレーヤーの最終的な状態は paused（2）になります。ただし、関数を呼び出したときのプレーヤーの状態が ended（0）のときは、状態は変わりません。
     */
    pauseVideo: () => void;

    /**
     * 現在の動画の読み込みを停止してキャンセルします。この関数は、ユーザーがプレーヤーでこれ以上動画を再生しないときのために予約されています。ただし、これはまれなケースです。動画を一時停止するという目的には、pauseVideo 関数を使用してください。プレーヤーで再生する動画を変更する場合は、stopVideo を呼び出さずにキュー関数のいずれか 1 つを呼び出してください。
     * 重要: pauseVideo 関数（プレーヤーが paused（2）状態のまま）と異なり、stopVideo 関数ではプレーヤーが再生以外の状態になります（例: ended（0）、paused（2）、video cued（5）、または unstarted（-1）。
     */
    stopVideo: () => void;

    /**
     * 動画を指定された時間シークします。この関数を呼び出したときにプレーヤーが一時停止している場合は一時停止のままになり、その他の状態（playing、video cued など）から呼び出した場合は、動画が再生されます。
     *
     * @param seconds プレーヤーを進ませる秒数を指定します。ユーザーがシークしている部分がダウンロード済みでなければ、このパラメータで指定した時間の前の最も近いキーフレームまで進みます。シークしている部分をダウンロード済みの場合、プレーヤーは Flash Player の NetStream オブジェクトの seek() メソッドで記述した時間の前後の最も近いキーフレームに進みます
     * @param allowSeekAhead seconds の値が現在バッファ済みの動画データの範囲内にない場合、プレーヤーからサーバーに新しいリクエストを行うかどうかを指定します。このパラメータは、ユーザーがマウスで動画の進行バーをドラッグしている間は false、マウスを放したら true に設定することをお勧めします。このように設定するとユーザーは、動画内の過去にバッファされていない場面をスクロールすることで、動画ストリームを新たにリクエストせずに、動画内の別の場面にスクロールできます。ユーザーがマウスボタンを放すと、プレーヤーは動画内の目的の画面に進み、必要に応じて新しい動画ストリームをリクエストします。
     */
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;

    /**
     * 動画の表示をクリアします。この関数は、stopVideo() を呼び出した後で動画の残りをクリアするときに役立ちます。
     */
    clearVideo: () => void;

    nextVideo: () => void;
    previousVideo: () => void;
    playVideoAt: (index: number) => void;

    /**
     * プレーヤーをミュートします。
     */
    mute: () => void;

    /**
     * プレーヤーのミュートを解除します。
     */
    unMute: () => void;

    /**
     * プレーヤーがミュートされている場合は true を、ミュートされていない場合は false を返します。
     */
    isMuted: () => boolean;

    /**
     * 音量を設定します。0～100 の整数値を指定します。
     */
    setVolume: (volume: number) => void;

    /**
     * プレーヤーの現在の音量を 0～100 の整数値で返します。getVolume() は、プレーヤーがミュートされている場合でも音量を返します。
     */
    getVolume: () => number;

    /**
     * プレーヤーを含む <iframe> のサイズをピクセル単位で設定します。
     */
    setSize: (width: number, height: number) => void;

    /**
     * この関数は、再生中の動画の再生速度を取得します。デフォルトの再生速度は 1 で、標準速度で再生されていることを示します。0.25、0.5、1、1.5、および 2 などの値になります。
     */
    getPlaybackRate: () => number;

    setPlaybackRate: (suggestedRate: number) => void;
    getAvailablePlaybackRates: () => number[];
    setLoop: (loopPlaylists: boolean) => void;
    setShuffle: (shufflePlaylist: boolean) => void;

    /**
     * プレーヤーがバッファ済みの動画の割合を 0～1 の数値で返します。
     */
    getVideoLoadedFraction: () => number;

    /**
     * プレーヤーの状態を返します。
     */
    getPlayerState: () => ValueOf<PlayerState>;

    /**
     * 動画の再生を開始してからの経過時間を秒数で返します。
     */
    getCurrentTime: () => number;

    /**
     * この関数は、現在の動画の実際の画質を取得します。
     */
    getPlaybackQuality: () => QualityLevels | undefined;

    /**
     * この関数は、現在の動画の推奨画質を設定し、現在の位置から新しい画質で動画を再読み込みします。再生画質を変更した場合、再生している動画の画質のみが変更されます。この関数を呼び出しても、実際に再生画質が変わるとは限りません。実際に再生画質が変わった場合には onPlaybackQualityChange イベントが起動します。コードは setPlaybackQuality 関数の呼び出しそのものにではなくこのイベントに反応するように指定する必要があります。
     *
     * @param suggestedQuality small、medium、large、hd720、hd1080、highres または default を指定できます。パラメータ値は default に設定することをお勧めします。この設定では YouTube が最適な再生画質を自動選択します。最適な再生画質は、ユーザー、動画、システムなどの再生条件によって異なります。
     * 動画の再生画質を指定する場合、指定した画質はその動画でのみ有効です。動画プレーヤーのサイズに合った再生画質を選択する必要があります。たとえば、1280x720 ピクセルの動画プレーヤーを表示しているページでは、hd1080 画質の動画よりも hd720 画質の動画のほうがきれいに表示されます。動画に設定可能な画質のレベルを調べるため、getAvailableQualityLevels() 関数を呼び出すことをお勧めします。
     */
    setPlaybackQuality: (suggestedQuality: QualityLevels | 'default') => void;
    getAvailableQualityLevels: () => QualityLevels[];

    /**
     * 再生中の動画の長さを秒数で返します。動画のメタデータが読み込まれるまで、getDuration() は 0 を返します。通常、この現象は動画再生を開始した直後に発生します。
     * 現在再生中の動画がライブイベントの場合、getDuration() 関数はライブ動画のストリーミングが開始されてからの経過時間を返します。この経過時間は、動画がリセットまたは中断されることなくストリーミングされた時間です。また、ストリーミングは一般的にイベントの開始時間よりも前に開始されるため、経過時間は実際のイベント時間よりも長くなります。
     */
    getDuration: () => number;

    /**
     * 読み込み済みまたは再生中の動画の YouTube.com URL を返します。
     */
    getVideoUrl: () => string;

    /**
     * 読み込み済みまたは再生中の動画の埋め込みコードを返します。
     */
    getVideoEmbedCode: () => string;

    /**
     * この関数は、現在の順序付けに従って再生リスト中の動画 ID の配列を返します。デフォルトでは、再生リストの所有者が指定した順序で動画 ID を返します。ただし、再生リストの順序をシャッフルする setShuffle 関数を呼び出している場合、getPlaylist() 関数の戻り値にはシャッフル済みの順序が反映されます。
     */
    getPlaylist: () => string[];

    /**
     * この関数は、現在再生中の再生リスト動画のインデックスを返します。
     *
     * 再生リストをシャッフルしていない場合は、再生リストの作成者が動画を再生リストのどの位置に置いたかがこの戻り値によって識別されます。戻り値はゼロベースのインデックスを使用するので、値 0 は再生リストの最初の動画を示します。
     * 再生リストをシャッフル済みの場合、戻り値は、シャッフルされた再生リスト中の動画の順序を示します。
     */
    getPlaylistIndex: () => number;

    /**
     * 指定した event のリスナー関数を追加します。プレーヤーが起動するイベントの説明については、以下のイベントのセクションを参照してください。listener は、指定したイベントが起動したときに実行する関数を指定する文字列です。
     */
    addEventListener: (event: string, listener: string) => void;

    /**
     * 指定した event のリスナー関数を削除します。listener は、指定したイベントが起動したときに実行されなくなった関数を指定する文字列です。
     */
    removeEventListener: (event: string, listener: string) => void;

    /**
     * このメソッドは、埋め込まれた <iframe> に対する DOM ノードを返します。
     */
    getIframe: () => Element;

    /**
     * プレーヤーを含む <iframe> を削除します。
     */
    destroy: () => void;
  }

  interface PlayerVars {
    /**
     * 	値: 0 または 1。デフォルトは 0 です。プレーヤーを読み込んだときに最初の動画を自動再生するかどうかを指定します。
     */
    autoplay: 0 | 1;

    /**
     * 値: 1。デフォルトは、ユーザー設定に基づきます。1 に設定すると、ユーザーが字幕をオフにしていても、字幕がデフォルトで表示されます。
     */
    cc_load_policy: 1;

    /**
     * プレーヤーの動画進行バーに動画を開始してからの経過時間を示すときに使用する色を指定します。有効なパラメータ値は red と white で、デフォルトではプレーヤーの動画進行バーに赤色が使用されます。color オプションの詳細については YouTube API ブログをご覧ください。
     * 注: color パラメータを white に設定すると、modestbranding オプションが無効になります。
     */
    color: 'red' | 'white';

    /**
     * 値: 0、1、または 2。デフォルトは 1 です。動画のプレーヤー コントロールを表示するかどうかを指定します。Flash プレーヤーを読み込む埋め込み IFrame の場合、いつプレーヤーにコントロールを表示するかと、いつプレーヤーを読み込むかも定義します。
     * controls=0 – プレーヤーにプレーヤー コントロールは表示されません。埋め込み IFrame の場合は、Flash プレーヤーがすぐに読み込まれます。
     * controls=1 – プレーヤーにプレーヤー コントロールが表示されます。埋め込み IFrame の場合は、コントロールがすぐに表示され、Flash プレーヤーもすぐに読み込まれます。
     * controls=2 – プレーヤーにプレーヤー コントロールが表示されます。埋め込み IFrame の場合は、ユーザーが動画の再生を開始した後にコントロールが表示され、Flash プレーヤーが読み込まれます。
     * 注: 埋め込み IFrame の場合は、パラメータ値が 1 と 2 の場合のユーザー エクスペリエンスはまったく同じですが、controls=2 を指定すると controls=1 よりもパフォーマンスがよくなります。現在は、動画のタイトルのフォントサイズが異なるなど、2 つの値の間でプレーヤーの表示にまだ多少の相違があります。ただし、両方の値の間の相違がユーザーにまったくわからなくなった場合は、パラメータのデフォルト値が 1 から 2 に変更される可能性があります。
     */
    controls: 0 | 1 | 2;

    /**
     * 値: 0 または 1。デフォルトは 0 です。1 に設定するとプレーヤーをキーボードで操作できなくなります。キーボードによる操作は次のようになります。
     * スペースキー: 再生 / 一時停止
     * 左矢印キー: 現在の動画を 10% 戻す
     * 右矢印キー: 現在の動画を 10% 進める
     * 上矢印キー: 音量を上げる
     * 下矢印キー: 音量を下げる
     */
    disablekb: 0 | 1;

    /**
     * 値: 0 または 1。デフォルトは 0 です。このパラメータを 1 に設定すると JavaScript API が有効になります。JavaScript API とその使用方法の詳細については、JavaScript API に関するドキュメントをご覧ください。
     */
    enablejsapi: 0 | 1;

    /**
     * 値: 正の整数。動画の再生を停止する必要がある場合に、動画を開始してからの経過時間を秒単位で指定します。時間は動画の先頭から測定されます。start プレーヤー パラメータや startSeconds パラメータの値からではありません。これらは、動画の読み込みまたはキューイングを行うために YouTube Player API 関数で使用されるパラメータです。
     */
    end: number;

    /**
     * 値: 0 または 1。デフォルト値は 1 です。この値を指定すると全画面表示ボタンが表示されます。このパラメータを 0 に設定すると、全画面表示ボタンは表示されなくなります。
     */
    fs: 0 | 1;

    /**
     * プレーヤーのインターフェースの言語を設定します。パラメータの値は、ISO 639-1 2 文字言語コードです。ただし、IETF 言語タグ（BCP 47）などの他の言語入力コードも正しく処理されます。
     * インターフェースの言語はプレーヤーのツールチップで使用され、デフォルトの字幕トラックにも影響します。なお、ユーザー個別の言語設定と利用可能な字幕トラックに基づいて、YouTube が特定のユーザーに対し異なる字幕トラックを選択することもあります。
     */
    hl: string;

    /**
     * 値: 1 または 3。デフォルトは 1 です。1 に設定すると動画アノテーションがデフォルト表示されます。3 に設定すると、動画アノテーションはデフォルトで表示されなくなります。
     */
    iv_load_policy: 1 | 2 | 3 | 0;

    /**
     * list パラメータは、プレーヤーに読み込むコンテンツを識別するときに、listType パラメータと組み合わせて使用します。
     * listType パラメータの値が search の場合は、list パラメータの値に検索クエリを指定します。
     * listType パラメータの値が user_uploads の場合、list パラメータの値には、読み込まれるアップロード動画の所有者の YouTube チャンネルを指定します。
     * listType パラメータの値が playlist の場合は、list パラメータの値に YouTube 再生リスト ID を指定します。パラメータ値に含める再生リスト ID には、下の例に示すように、PL という文字を先頭に付ける必要があります。
     * http://www.youtube.com/embed?listType=playlist&list=PLC77007E23FF423C6
     * 注: list パラメータと listType パラメータに値を指定する場合は、IFrame 埋め込み URL に動画 ID を指定する必要はありません。
     */
    list: string;

    /**
     * listType パラメータは、プレーヤーに読み込むコンテンツを識別するときに list パラメータと組み合わせて使用します。有効なパラメータ値は、playlist、search および user_uploads です。
     * list パラメータと listType パラメータに値を指定する場合は、IFrame 埋め込み URL に動画 ID を指定する必要はありません。
     */
    listType: 'playlist' | 'search' | 'user_uploads';

    /**
     * 値: 0 または 1。デフォルトは 0 です。単一動画プレーヤーの場合に 1 を設定すると、最初の動画が繰り返し再生されます。再生リストプレーヤーまたはカスタム プレーヤーの場合、再生リスト全体を再生した後、最初の動画から再び再生が始まります。
     * 注: このパラメータは AS3 プレーヤーと埋め込み IFrame でのみサポートされており、AS3 または HTML5 プレーヤーのいずれかが読み込まれます。loop パラメータは、現時点では playlist パラメータと組み合わせて AS3 プレーヤーで使用した場合のみ動作します。単一の動画をループさせる場合は、loop パラメータの値を 1 に設定し、既に Player API URL に指定してある動画 ID と同じ値を playlist パラメータの値に設定します。
     * http://www.youtube.com/v/VIDEO_ID?version=3&loop=1&playlist=VIDEO_ID
     */
    loop: 0 | 1;

    /**
     * このパラメータを使用すると、YouTube プレーヤーに YouTube ロゴが表示されないようにすることができます。パラメータの値を 1 に設定すると、YouTube ロゴがコントロール バーに表示されなくなります。ただし、動画を一時停止したときにユーザーがプレーヤーにカーソルを合わせると、動画の右上に引き続き小さい YouTube テキストラベルが表示されます。
     */
    modestbranding: 0 | 1;

    /**
     * このパラメータは IFrame API のセキュリティを強化します。埋め込み IFrame でのみ使用できます。IFrame API を使用している場合、つまり enablejsapi パラメータの値を 1 に設定している場合は、常に自分のドメインを origin パラメータ値として指定する必要があります。
     */
    origin: string;

    /**
     * 値: 再生する動画 ID をカンマで区切ったリスト。値を指定すると、URL パスの VIDEO_ID に指定した動画が最初に再生され、playlist パラメータに指定した動画はその後に再生されます。
     */
    playlist: string;

    /**
     * このパラメータは iOS 上の HTML5 プレーヤーで動画をインラインまたは全画面表示のどちらで再生するかを制御します。有効な値は次のとおりです。
     * 0: この値を指定すると全画面表示で再生されます。現時点ではこれがデフォルト値ですが、デフォルトは変更される場合があります。
     * 1: この値を指定すると、UIWebViews（allowsInlineMediaPlayback プロパティを TRUE に設定して作成したもの）がインライン再生されます。
     */
    playsinline: 0 | 1;

    /**
     * 値: 0 または 1。デフォルトは 1 です。最初の動画の再生が終了したときに、プレーヤーに関連動画を表示するかどうかを指定します。
     */
    rel: 0 | 1;

    /**
     * 値: 0 または 1。デフォルト値は 1 です。パラメータの値を 0 に設定すると、動画の再生が始まる前に動画のタイトルやアップロードしたユーザーなどの情報は表示されません。
     * プレーヤーに再生リストが読み込まれる場合は、パラメータの値を明示的に 1 に設定すると、再生リストに含まれる動画のサムネイル画像も読み込み時に表示されます。AS3 プレーヤーは再生リストの読み込みができる唯一のプレーヤーであるため、この機能はこのプレーヤーでのみサポートされます。
     */
    showinfo: 0 | 1;

    /**
     * 値: 正の整数。このパラメータを指定すると、動画の先頭から指定された秒数分進めた位置から動画の再生が開始されます。seekTo 関数と同様に、プレーヤーは指定された時間に最も近いキーフレームを探します。そのため、リクエストされた時間の直前から再生が開始される場合もありますが、ずれは通常、最大で 2 秒程度です。
     */
    start: number;
  }

  interface PlayerEvents {
    onReady: (event: Event) => void;
    onStateChange: (event: StateChangeEvent) => void;
    onPlaybackQualityChange: (event: PlaybackQualityChangeEvent) => void;
    onPlaybackRateChange: (event: PlaybackRateChangeEvent) => void;
    onError: (event: ErrorEvent) => void;
    onApiChange: (event: ApiChangeEvent) => void;
  }

  interface StateChangeEvent extends Event {
    data: ValueOf<PlayerState>;
  }
  interface PlaybackQualityChangeEvent extends Event {
    data: QualityLevels;
  }
  interface PlaybackRateChangeEvent extends Event {
    data: number;
  }
  interface ErrorEvent extends Event {
    data: number;
  }
  interface ApiChangeEvent extends Event {
    data: unknown;
  }
}
