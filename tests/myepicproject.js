const anchor = require('@project-serum/anchor');
// Need the system program, will talk about this soon.
const { SystemProgram } = anchor.web3;

const main = async() => {
  console.log("๐ Starting test...")

  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;
	
  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  // Call start_stuff_off, pass it the params it needs!
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("๐ Your transaction signature", tx);

  // Fetch data from the account.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('๐ Profile Count', account.totalProfiles.toString())

  // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
  await program.rpc.addProfile("JoeHank","https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif","https://twitter.com/darkjoehank","","https://www.youtube.com/channel/UCo_ASkoxBnPwoAZv1CQiRDQ", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('๐ Profile Count', account.totalProfiles.toString())

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('๐ Subs Count', account.totalSubs.toString())

  // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
  // await program.rpc.addSubscription("1","Primer nivel de suscripciรณn", {
  //   accounts: {
  //     baseAccount: baseAccount.publicKey,
  //     user: provider.wallet.publicKey,
  //   },
  // });

  // // Call the account.
  // account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  // console.log('๐ Subs Count', account.totalSubs.toString())

  // Access gif_list on the account!
  console.log('๐ Profile List', account.profileList)

  // Access gif_list on the account!
  console.log('๐ Profile List', account.subscriptionList)

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();